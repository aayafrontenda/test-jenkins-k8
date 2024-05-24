import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MainDatePicker from "../../components/shared-components/date-pickers/MainDatePicker";
import PropProductionChart from "../../components/Dashboard/PropProductionChart";
import AppContext from "../../context/app-context";
import TotalProductionChart from "../../components/Dashboard/TotalProductionChart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WellStockChart from "../../components/Dashboard/WellStockChart";
import { formatMessage as translate } from "devextreme/localization";
import axios from "axios";
import { Actions } from "../../context/APIState";

const generatePropsData = (dateStart, dateEnd, includeNegatives) => {
  let range = dateEnd - dateStart;
  let data = [];
  const getRandomValue = () => {
    const value = includeNegatives
      ? Math.floor(Math.random() * 201) - 100
      : Math.floor(Math.random() * 100);
    return value === 0 ? 50 : value;
  };
  console.log(
    "dateStart",
    dateStart,
    "dateEnd",
    dateEnd,
    "rangeStep",
    Math.floor(range / 7)
  );
  for (let i = dateStart; i <= dateEnd; i += Math.floor(range / 7)) {
    data.push({
      date: new Date(i),
      liquid: getRandomValue(), // Generates random number between -100 and 100
      liquidTon: getRandomValue(), // Generates random number between -100 and 100
      oil: getRandomValue(), // Generates random number between -100 and 100
    });
  }
  console.log("generatedPropsData", data);
  if (data.length > 7) {
    return data.slice(1, data.length);
  }
  return data;
};

const generateStatusData = (dateStart, dateEnd, includeNegatives) => {
  let range = dateEnd - dateStart;
  let data = [];
  const getRandomValue = () => {
    const value = includeNegatives
      ? Math.floor(Math.random() * 201) - 100
      : Math.floor(Math.random() * 100);
    return value === 0 ? 50 : value;
  };
  for (let i = dateStart; i <= dateEnd; i += Math.floor(range / 7)) {
    data.push({
      date: new Date(i),
      online: getRandomValue(), // Generates random number between -100 and 100
      off: getRandomValue(), // Generates random number between -100 and 100
      stopped: getRandomValue(), // Generates random number between -100 and 100
    });
  }
  if (data.length > 7) {
    return data.slice(1, data.length);
  }
  return data;
};

export default function Dashboard() {
  const [pun, setPun] = useState("All");
  const [gu, setGu] = useState("All");
  const [agzu, setAgzu] = useState("All");

  const { currentRangeFlowmeters, hierarchy, setHierarchy, jwtToken } =
    useContext(AppContext);

  useEffect(() => {
    if (!localStorage.getItem("hierarchy")) {
      axios
        .get(Actions.GetFlowmeterHierarchy, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => {
          console.log("response", response.data.assets[0]);
          setHierarchy(response.data.assets[0]);
        });
    }
  }, []);

  const TopChart = ({ title, propName, colors }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "white",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: 600, fontSize: "16px" }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", marginTop: "8px", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "33px",
              textAlign: "left",
            }}
          >
            6,371
          </Typography>
          <ArrowDropDownIcon sx={{ color: colors[0] }} />
          <Typography sx={{ color: colors[0] }}>35.26</Typography>
        </Box>
        <PropProductionChart
          colors={colors}
          propName={propName}
          data={generatePropsData(
            currentRangeFlowmeters.middle,
            currentRangeFlowmeters.end,
            true
          )}
        />
      </Box>
    );
  };

  const BottomChart = ({ colors }) => {
    return (
      <>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "36px",
            marginTop: "-8px",
          }}
        >
          {translate("TotalProduction")}
        </Typography>
        <TotalProductionChart
          colors={colors}
          data={generatePropsData(
            currentRangeFlowmeters.middle,
            currentRangeFlowmeters.end,
            false
          )}
          // data={[]}
        />
      </>
    );
  };

  const RightChart = ({ title, colors }) => {
    return (
      <>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "36px",
            marginTop: "-8px",
          }}
        >
          {title}
        </Typography>
        <WellStockChart
          colors={colors}
          data={generateStatusData(
            currentRangeFlowmeters.middle,
            currentRangeFlowmeters.end,
            false
          )}
        />
      </>
    );
  };

  return (
    localStorage.getItem("hierarchy") && (
      <>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            padding: "16px 32px",
          }}
        >
          <MainDatePicker
            tabsDisplayed={true}
            tabsPosition="right"
            pickerDisplayed={true}
            position="left"
            labelPosition="left"
            style={{ marginLeft: "0" }}
          />
          <FormControl
            sx={{
              width: "10%",
              marginLeft: "auto",
              color: "white",
            }}
            size="small"
          >
            <Select
              value={pun}
              onChange={(e) => setPun(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"All"}>{translate("AllPUN")}</MenuItem>
              {hierarchy.subAssets.map((punX) => (
                <MenuItem value={punX.assetId}>{punX.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "10%", color: "white" }} size="small">
            <Select
              value={gu}
              onChange={(e) => setGu(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"All"}>{translate("AllGU")}</MenuItem>
              {(pun === "All"
                ? hierarchy.subAssets
                : hierarchy.subAssets.filter((punY) => punY.assetId === pun)
              ).map((punX) =>
                punX.subAssets.map((guX) => (
                  <MenuItem value={guX.assetId}>{guX.name}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "10%", color: "white" }} size="small">
            <Select value={agzu} onChange={(e) => setAgzu(e.target.value)}>
              <MenuItem value={"All"}>{translate("AllAGZU")}</MenuItem>
              {(pun === "All"
                ? hierarchy.subAssets
                : hierarchy.subAssets.filter((punY) => punY.assetId === pun)
              ).map((punX) =>
                (gu === "All"
                  ? punX.subAssets
                  : punX.subAssets.filter((guY) => guY.assetId === gu)
                ).map((guX) =>
                  guX.subAssets.map((agzuX) => (
                    <MenuItem value={agzuX.assetId}>{agzuX.name}</MenuItem>
                  ))
                )
              )}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            padding: "0px 24px 24px 24px",
            width: "100%",
            height: "79vh",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gap: "24px",
            backgroundColor: "transparent",
          }}
        >
          <Box
            sx={{
              gridArea: "1 / 1 / 4 / 4",
              backgroundColor: "#151B28",
              borderRadius: "8px",
              display: "flex",
              position: "relative",
              padding: "24px",
            }}
          >
            <BottomChart colors={["#4C88FF", "#FF964B", "#01B574"]} />
          </Box>
          <Box
            sx={{
              gridArea: "4 / 1 / 6 / 2",
              backgroundColor: "#151B28",
              borderRadius: "8px",
              display: "flex",
              position: "relative",
              padding: "24px",
            }}
          >
            <TopChart
              title={`${translate("LiquidProduction")} (${translate("m^3")})`}
              colors={["#4C88FF", "#4C88FF1E"]}
              propName="liquid"
            />
          </Box>
          <Box
            sx={{
              gridArea: "4 / 2 / 6 / 3",
              backgroundColor: "#151B28",
              borderRadius: "8px",
              display: "flex",
              position: "relative",
              padding: "24px",
            }}
          >
            <TopChart
              title={`${translate("LiquidProduction")} (${translate("ton")})`}
              colors={["#01B574", "#01B5741E"]}
              propName="liquidTon"
            />
          </Box>
          <Box
            sx={{
              gridArea: "4 / 3 / 6 / 4",
              backgroundColor: "#151B28",
              borderRadius: "8px",
              display: "flex",
              position: "relative",
              padding: "24px",
            }}
          >
            <TopChart
              title={`${translate("OilProduction")} (${translate("ton")})`}
              colors={["#FF964B", "#FF964B1E"]}
              propName="oil"
            />
          </Box>
          <Box
            sx={{
              gridArea: "1 / 4 / 6 / 6",
              backgroundColor: "#151B28",
              borderRadius: "8px",
              display: "flex",
              position: "relative",
              padding: "24px",
            }}
          >
            <RightChart
              title={translate("WellStockByField")}
              colors={["#4C88FF", "#FF964B", "#01B574"]}
            />
          </Box>
        </Box>
      </>
    )
  );
}
