import "./App.css";
import Navbar from "./components/shared-components/Navbar";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeContext } from "./themes/ColorModeContext";
import Measurements from "./pages/Measurements/Measurements";
import AppState from "./context/AppState";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SelectedPage from "./pages/Measurements/SelectedPage/SelectedPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Heatmap from "./pages/Heatmap/Heatmap";
import Login from "./pages/Login/Login";
import AppContext from "./context/app-context";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { locale } from "devextreme/localization";
import Profile from "./pages/Profile/Profile";

function NoToggleThemeApp() {
  const { authorized, language, mode } = useContext(AppContext);
  // useEffect(() => {
  //   if (mode === "dark") {
  //     document.body.classList.add("dark");
  //   }
  // }, []);

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });
  locale(language);
  return (
    <div className="App">
      {/* <ThemeProvider theme={darkTheme}> */}
      <BrowserRouter>
        {authorized && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              authorized ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/home"
            element={
              authorized ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={authorized ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/measurements/selected/:flowmeterName"
            element={authorized ? <SelectedPage /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/measurements/*"
            element={authorized ? <Measurements /> : <Navigate to="/login" />}
          />
          <Route
            path="/heatmap"
            element={authorized ? <Heatmap /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authorized ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },

        typography: {
          // Set the default font size and family
          fontSize: 14,
          fontFamily: '"Noto Sans", sans-serif',

          // Override specific variants
          h1: {
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "24px",
            color: "#FFFFFF",
          },
          h5: {
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "24px",
            textAlign: "left",
            color: "#FFFFFF",
          },
          body1: {
            fontSize: "1rem",
            fontWeight: 400,
          },
          button: {
            fontSize: "0.875rem",
            textTransform: "none", // Remove uppercase transformation for buttons
          },
          measurementProp: {
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "22.5px",
            textAlign: "left",
          },
          measurementValue: {
            fontSize: "17px",
            fontWeight: "700",
            lineHeight: "22.5px",
            letterSpacing: "0em",
            textAlign: "left",
          },
          waterfallTitle: {
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: "36px",
            textAlign: "left",
            color: "white",
          },
          subTabButtonText: {
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "24px",
            textAlign: "left",
          },
          waterfallParamsText: {
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "24px",
            textAlign: "left",
            color: "white",
          },
          abnormalParamsText: {
            fontSize: "18px",
            fontWeight: "700",
            lineHeight: "27px",
            letterSpacing: "0.05em",
            color: "white",
          },
          colorConfigTitle: {
            fontSize: "24px",
            fontWeight: "700",
          },
          colorConfigButtonText: {
            fontSize: "16px",
            fontWeight: "500",
          },
          colorConfigPropName: {
            fontSize: "16px",
            fontWeight: "500",
          },
          // Add more variants as needed
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AppState>
          <NoToggleThemeApp />
        </AppState>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
