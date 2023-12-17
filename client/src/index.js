import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto";
import "./styles/index.css";

// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.render(
  <React.StrictMode>
    {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
    <AuthProvider>
      <CssBaseline />
      <App />
    </AuthProvider>
    {/* </LocalizationProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
