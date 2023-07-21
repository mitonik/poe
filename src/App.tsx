import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Map from "./components/Map";

import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Map />
    </ThemeProvider>
  );
}
