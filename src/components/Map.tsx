import {
  CRS,
  LatLngBoundsLiteral,
  Transformation,
  divIcon,
  extend,
  icon,
  marker,
} from "leaflet";
import { LayersControl, MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import { FeatureCollection } from "geojson";

import Controls from "./Controls";

import locationNameData from "../data/location.json";
import cetusWispData from "../data/wisps.json";
import grineerOutpostData from "../data/grineer.json";
import thousandYearFishData from "../data/thousand-year-fish.json";
import blinkpadData from "../data/blinkpad.json";
import caveEntranceData from "../data/cave.json";
import bountyConsoleData from "../data/bountyConsole.json";

import cetusWispImage from "../assets/cetus-wisp.webp";
import grineerIconImage from "../assets/grineer.webp";
import fishImage from "../assets/thousand-year-fish-statuette.webp";
import blinkpadImage from "../assets/blinkpad.webp";
import caveImage from "../assets/cave.webp";
import ostronImage from "../assets/ostron-sigil.webp";

import "leaflet/dist/leaflet.css";

const wispData = cetusWispData as FeatureCollection;
const grineerData = grineerOutpostData as FeatureCollection;
const fishData = thousandYearFishData as FeatureCollection;
const blinkData = blinkpadData as FeatureCollection;
const caveData = caveEntranceData as FeatureCollection;
const locationData = locationNameData as FeatureCollection;
const bountyConsole = bountyConsoleData as FeatureCollection;

const TILE_SIZE = 256;
const MAP_SIZE = 8192;

const factor = TILE_SIZE / MAP_SIZE;

const customCRS = extend({}, CRS.Simple, {
  transformation: new Transformation(factor, 0, factor, 0),
});

const MAP_BOUNDS: LatLngBoundsLiteral = [
  [0, 0],
  [6478, 6478],
];

const TILES_URL = "/poe/tiles/poe";

const createIcon = (iconUrl: string) => {
  return icon({ iconUrl: iconUrl, iconSize: [48, 48] });
};

const wispIcon = createIcon(cetusWispImage);
const grineerIcon = createIcon(grineerIconImage);
const fishIcon = createIcon(fishImage);
const blinkpadIcon = createIcon(blinkpadImage);
const caveIcon = createIcon(caveImage);
const bountyConsoleIcon = createIcon(ostronImage);

export default function Map() {
  return (
    <MapContainer
      bounds={MAP_BOUNDS}
      crs={customCRS}
      maxZoom={7}
      minZoom={0}
      style={{ width: "100dvw", height: "100dvh" }}
      zoomControl={false}
      attributionControl={false}
    >
      <Controls />
      <LayersControl position="bottomleft">
        <LayersControl.BaseLayer name="Surface" checked>
          <TileLayer
            maxNativeZoom={5}
            minNativeZoom={0}
            bounds={MAP_BOUNDS}
            url={`${TILES_URL}/surface/{z}/{x}/{y}.webp`}
            keepBuffer={10}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Caves">
          <TileLayer
            maxNativeZoom={5}
            minNativeZoom={0}
            bounds={MAP_BOUNDS}
            url={`${TILES_URL}/caves/{z}/{x}/{y}.webp`}
            keepBuffer={10}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Blinkpad" checked>
          <GeoJSON
            data={blinkData}
            pointToLayer={(_geoJsonPoint, latlng) =>
              marker(latlng, {
                icon: blinkpadIcon,
                alt: "Blinkpad",
              }).bindTooltip("Blinkpad", {
                offset: [0, -24],
                direction: "top",
              })
            }
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Bounty Console">
          <GeoJSON
            data={bountyConsole}
            pointToLayer={(_geoJsonPoint, latlng) =>
              marker(latlng, {
                icon: bountyConsoleIcon,
                alt: "Bounty Console",
              }).bindTooltip("Bounty Console", {
                offset: [0, -24],
                direction: "top",
              })
            }
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Cave" checked>
          <GeoJSON
            data={caveData}
            pointToLayer={(_geoJsonPoint, latlng) =>
              marker(latlng, { icon: caveIcon, alt: "Cave" }).bindTooltip(
                "Cave",
                {
                  offset: [0, -24],
                  direction: "top",
                },
              )
            }
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Cetus Wisp">
          <GeoJSON
            data={wispData}
            pointToLayer={(_geoJsonPoint, latlng) =>
              marker(latlng, { icon: wispIcon, alt: "Cetus Wisp" }).bindTooltip(
                "Cetus Wisp",
                {
                  offset: [0, -24],
                  direction: "top",
                },
              )
            }
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Grineer Outpost" checked>
          <GeoJSON
            data={grineerData}
            pointToLayer={(_geoJsonPoint, latlng) =>
              marker(latlng, {
                icon: grineerIcon,
                alt: "Grineer Outpost",
              }).bindTooltip("Grineer Outpost", {
                offset: [0, -24],
                direction: "top",
              })
            }
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Location Names" checked>
          <GeoJSON
            data={locationData}
            pointToLayer={(geoJsonPoint, latlng) => {
              const name = geoJsonPoint.properties?.name;

              return marker(latlng, {
                icon: divIcon({ html: name, className: "locationName" }),
                interactive: false,
              });
            }}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Thousand-Year Fish">
          <GeoJSON
            data={fishData}
            pointToLayer={(geoJsonPoint, latlng) => {
              const name = geoJsonPoint.properties?.name;
              const isInCave = geoJsonPoint.properties?.isInCave;
              const content = `Thousand-Year Fish, "${name}"${isInCave ? " (underground)" : ""
                }`;

              return marker(latlng, {
                icon: fishIcon,
                alt: "Thousand-Year Fish",
              }).bindTooltip(content, {
                offset: [0, -24],
                direction: "top",
              });
            }}
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
