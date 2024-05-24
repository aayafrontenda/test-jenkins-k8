import { Box, Tab, Tabs } from "@mui/material";
import React, { useContext, useState } from "react";
import { colors } from "../../themes/colors";
import { useTheme } from "@emotion/react";
import Schematics from "./Schematics/Schematics";
import Waterfall from "./Waterfall/Waterfall";
import Abnormal from "./Abnormal/Abnormal";
import MainDatePicker from "../../components/shared-components/date-pickers/MainDatePicker";
import ColorConfigurationButton from "../../components/shared-components/ColorConfigurationButton";
import FilterButton from "../../components/shared-components/FilterButton";
import { Route, Routes, useNavigate } from "react-router-dom";
import SelectedPage from "./SelectedPage/SelectedPage";
import AppContext from "../../context/app-context";
import { formatMessage as translate } from "devextreme/localization";
import AcceptableDeviation from "../../components/Measurements/Waterfall/AcceptableDeviation";

export default function Measurements() {
  const navigate = useNavigate();
  const { route, setRoute, acceptableDeviation, setAcceptableDeviation } =
    useContext(AppContext);
  const [tab, setTab] = useState(
    route.includes("waterfall") ? 1 : route.includes("abnormal") ? 2 : 0
  );
  const theme = useTheme();
  const palette = colors(theme.palette.mode);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <>{children}</>
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setTab(newValue);
    switch (newValue) {
      case 0:
        setRoute("/measurements/schematics");
        navigate("/measurements/schematics");
        break;
      case 1:
        setRoute("/measurements/waterfall");
        navigate("/measurements/waterfall");
        break;
      case 2:
        setRoute("/measurements/abnormal");
        navigate("/measurements/abnormal");
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          // height: "60px",
          display: "flex",
          alignItems: "center",
          p: "0px 16px 16px 0px",
        }}
      >
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              height: "0px",
              backgroundColor: "transparent",
            },
            "& .MuiTab-root": {
              fontSize: "16px !important",
              width: "123px",
            },
            "& .MuiTab-root.Mui-selected": {
              fontWeight: "700",
              color: "white",
              backgroundColor: "#151B28",
            },
            "&": {
              height: "100% !important",
              alignItems: "center !important",
            },
          }}
        >
          <Tab label={translate("Schematics")} {...a11yProps(0)} />
          <Tab label={translate("Waterfall")} {...a11yProps(1)} />
          <Tab label={translate("Abnormal")} {...a11yProps(2)} />
        </Tabs>
        {tab === 0 && (
          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
              marginRight: "24px",
            }}
          >
            <ColorConfigurationButton style={{ marginRight: "164px" }} />
          </Box>
        )}
        {tab === 1 && (
          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
            }}
          >
            <MainDatePicker
              tabsDisplayed={true}
              pickerDisplayed={true}
              tabsPosition="left"
              labelPosition="left"
            />
            <ColorConfigurationButton style={{ marginRight: "16px" }} />
          </Box>
        )}
        {tab === 2 && (
          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
              gap: "32px",
            }}
          ></Box>
        )}
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <Schematics />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <Waterfall />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={2}>
        <Abnormal />
      </CustomTabPanel>
      <Routes>
        {/* Define routes for each tab */}
        <Route path="/measurements/schematics" element={<Schematics />} />
        <Route path="/measurements/waterfall" element={<Waterfall />} />
        <Route path="/measurements/abnormal" element={<Abnormal />} />
      </Routes>
    </Box>
  );
}
