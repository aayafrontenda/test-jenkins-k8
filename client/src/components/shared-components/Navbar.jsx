import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IconButton,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Logo from "../../images/Logo";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../themes/ColorModeContext";
import DashboardIcon from "../../images/DashboardIcon";
import MeasurementsIcon from "../../images/MeasurementsIcon";
import HeatmapIcon from "../../images/HeatmapIcon";
import { colors } from "../../themes/colors";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/app-context";
import { formatMessage as translate } from "devextreme/localization";
import { set } from "date-fns";
import { Actions } from "../../context/APIState";

const tabStyle = (mode, active) => {
  return {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "40px",
    paddingBottom: "4px",
    "&:hover": {
      cursor: "pointer",
      color: colors(mode).hovered,
    },
    color: active ? colors(mode).activeTab : colors(mode).inactiveTab,
    borderBottom: active ? `4px solid ${colors(mode).activeTab}` : "none",
    borderRadius: "1px",
    width: "150px",
  };
};

export default function Navbar() {
  const { route, setRoute, setLanguage } = useContext(AppContext);
  const currentUnixRef = useRef(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUnixRef.current = Date.now();
      if (
        localStorage.getItem("expiryDate") &&
        currentUnixRef.current >= Number(localStorage.getItem("expiryDate"))
      )
        handleLogout();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [tab, setTab] = useState("");
  useEffect(() => {
    console.log("route", route);
    if (route.includes("measurements")) {
      setTab("measurements");
    } else if (route.includes("heatmap")) {
      setTab("heatmap");
    } else {
      setTab("dashboard");
    }
  }, [route]);

  useEffect(() => {
    const location = window.location.pathname;
    console.log("location", location);
    setRoute(location);
  }, []);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const mode = theme.palette.mode;

  const { setAuthorized, jwtToken, setJwtToken } = useContext(AppContext);

  const anchorRef = useRef(null);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleToggle = () => {
    setUserMenuOpen((prev) => !prev);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setUserMenuOpen(false);
    } else if (event.key === "Escape") {
      setUserMenuOpen(false);
    }
  }

  const handleClose = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    navigate("/login");
    setAuthorized(false);

    fetch(Actions.Logout, {
      method: "POST",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${jwtToken ? jwtToken : ""}`, // Replace with your actual access token
        "Content-Type": "application/json",
      },
      body: "",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
      })
      .catch((error) => {
        // Handle errors
      });

    setJwtToken("");
    localStorage.clear();
    sessionStorage.clear();
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    handleClose();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0C0F17",
          backgroundImage: "none",
          height: "70px",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Toolbar>
          <Logo width={192} height={32} color="white" />
          <Link
            to="/dashboard"
            onClick={() => {
              setTab("dashboard");
              setRoute("/dashboard");
            }}
            style={{ textDecoration: "none", display: "flex", height: "70px" }}
          >
            <Box
              sx={{
                ...tabStyle(mode, tab === "dashboard"),
                marginLeft: "20px",
              }}
            >
              <DashboardIcon active={tab === "dashboard"} />
              <Typography component="div" sx={{ fontSize: "18px" }}>
                {translate("Dashboard")}
              </Typography>
            </Box>
          </Link>
          <Link
            to="/measurements"
            style={{ textDecoration: "none", display: "flex", height: "70px" }}
            onClick={() => {
              setTab("measurements");
              setRoute("/measurements");
            }}
          >
            <Box sx={tabStyle(mode, tab === "measurements")}>
              <MeasurementsIcon active={tab === "measurements"} />
              <Typography component="div" sx={{ fontSize: "18px" }}>
                {translate("Measurements")}
              </Typography>
            </Box>
          </Link>
          <Link
            to="/heatmap"
            style={{ textDecoration: "none", display: "flex", height: "70px" }}
            onClick={() => {
              setTab("heatmap");
              setRoute("/heatmap");
            }}
          >
            <Box
              sx={{ ...tabStyle(mode, tab === "heatmap"), marginRight: "auto" }}
            >
              <HeatmapIcon active={tab === "heatmap"} />
              <Typography component="div" sx={{ fontSize: "18px" }}>
                {translate("Heatmap")}
              </Typography>
            </Box>
          </Link>
          {/* <IconButton
            sx={{ ml: "auto" }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton> */}
          <div style={{ marginLeft: "auto" }}>
            <IconButton
              size="large"
              color="inherit"
              ref={anchorRef}
              id="composition-button"
              aria-controls={userMenuOpen ? "composition-menu" : undefined}
              aria-expanded={userMenuOpen ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AccountCircle />
            </IconButton>
            <Popper
              open={userMenuOpen}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              sx={{ zIndex: 10000 }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={userMenuOpen}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={() => navigate("/profile")}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
