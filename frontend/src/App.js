import React from "react";
import Dashboard from "./pages/Dashboard";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4caf50"
    },
    secondary: {
      main: "#f44336"
    },
    background: {
      default: "#0f172a"
    }
  },
  shape: {
    borderRadius: 12
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;