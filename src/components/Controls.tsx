import {
  Add,
  FullscreenExitOutlined,
  FullscreenOutlined,
  Remove,
} from "@mui/icons-material";
import { IconButton, Paper, Stack } from "@mui/material";
import { Map } from "leaflet";
import { useState } from "react";
import { useMap } from "react-leaflet";

export default function Controls() {
  const map = useMap();
  // const [points, setPoints] = useState<number[][]>([]);
  // useMapEvent("click", (e) => {
  //   const x = e.latlng.lng;
  //   const y = e.latlng.lat;
  //   setPoints([...points, [x, y]]);
  // });
  // useEffect(() => {
  //   console.log(points);
  // }, [points]);
  const [isFullscreen, setIsFullscreen] = useState(
    document.fullscreenElement != null,
  );
  const toggleFullscreen = async (map: Map) => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      setIsFullscreen(false);
      return;
    }
    map.getContainer().requestFullscreen();
    setIsFullscreen(true);
  };

  return (
    <Paper
      sx={{ position: "absolute", bottom: "10px", right: "10px", zIndex: 1000 }}
    >
      <Stack>
        <IconButton onClick={() => map.zoomIn(1)} aria-label="zoom in">
          <Add />
        </IconButton>
        <IconButton onClick={() => map.zoomOut(1)} aria-label="zoom out">
          <Remove />
        </IconButton>
        <IconButton
          onClick={() => toggleFullscreen(map)}
          aria-label="toggle fullscreen"
        >
          {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </IconButton>
      </Stack>
    </Paper>
  );
}
