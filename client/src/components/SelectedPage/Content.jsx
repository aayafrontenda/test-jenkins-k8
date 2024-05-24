import { KeyboardBackspace } from "@mui/icons-material";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatMessage as translate } from "devextreme/localization";
import MainDatePicker from "../shared-components/date-pickers/MainDatePicker";
import ConfigurationIcon from "../../images/ConfigurationIcon";
import WarningIcon from "../../images/WarningIcon";
import DangerIcon from "../../images/DangerIcon";
import DataGridTable from "./DataGridEventsTable";
import Events from "./Events";
import TotalProductionChart from "../Dashboard/TotalProductionChart";
import AppContext from "../../context/app-context";
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

const getStatus = (prop, value, targetValue, colorConfigRanges) => {
  const diff = Math.floor((Math.abs(value - targetValue) / targetValue) * 100);
  return diff < colorConfigRanges[prop][0]
    ? "Normal"
    : diff < colorConfigRanges[prop][1]
    ? "Caution"
    : "Critical";
};

const Status = ({ prop, value, targetValue, colorConfigRanges }) => {
  const status = getStatus(prop, value, targetValue, colorConfigRanges);
  return (
    <>
      <Typography
        sx={{
          color:
            status === "Normal"
              ? "#15D28E"
              : status === "Caution"
              ? "#E99C26"
              : "#DC2626",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "21px",
        }}
      >
        {translate(status)}
      </Typography>
      {status === "Caution" && <WarningIcon style={{ marginLeft: "-16px" }} />}
      {status === "Critical" && <DangerIcon style={{ marginLeft: "-16px" }} />}
    </>
  );
};

const pipeData = [
  {
    id: "1",
    name: "1",
    liquid: 100,
    suggestedLiquid: 100,
    liquidTon: 98,
    suggestedLiquidTon: 100,
    oil: 20,
    suggestedOil: 19,
  },
  {
    id: "2",
    name: "2",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "3",
    name: "3",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "4",
    name: "4",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "5",
    name: "5",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "6",
    name: "6",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "7",
    name: "7",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "9",
    name: "8",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "10",
    name: "8",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "11",
    name: "8",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "12",
    name: "8",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "13",
    name: "8",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
  {
    id: "14",
    name: "8",
    liquid: 100,
    suggestedLiquid: 90,
    liquidTon: 102,
    suggestedLiquidTon: 92,
    oil: 20,
    suggestedOil: 18,
  },
];

const propNameStyle = (customStyle = {}) => {
  return {
    ...customStyle,
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "21px",
    color: "#A0A0A0",
    width: "60%",
  };
};

const propValueStyle = (
  customStyle = {},
  prop,
  value,
  targetValue = 100,
  colorConfigRanges
) => {
  console.log("colorConfigRanges", colorConfigRanges);
  console.log("prop", prop);
  const diff = Math.floor((Math.abs(value - targetValue) / targetValue) * 100);
  return {
    ...customStyle,
    color:
      diff < colorConfigRanges[prop][0]
        ? "#15D28E"
        : diff < colorConfigRanges[prop][1]
        ? "#E99C26"
        : "#DC2626",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "21px",
    width: "40%",
  };
};

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

const PageTabs = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#151B28",
        borderRadius: "8px",
        gridArea: "1 / 6 / 7 / 9",
      }}
    >
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          width: "100% !important",
          "& .MuiTabs-indicator": {
            height: "1px",
            color: "#4C88FF",
          },
          "& .MuiTab-root": {
            fontWeight: "400",
            color: "white",
            backgroundColor: "transparent",
          },
          "& .MuiTab-root.Mui-selected": {
            fontWeight: "700",
            color: "#4C88FF",
            backgroundColor: "transparent",
          },
        }}
      >
        <Tab
          label={translate("EventLogs")}
          {...a11yProps(0)}
          sx={{ width: "25%", padding: "0px !important" }}
        />
        <Tab
          label={translate("TagList")}
          {...a11yProps(1)}
          sx={{ width: "25%" }}
        />
        <Tab
          label={translate("AlarmConfig")}
          {...a11yProps(2)}
          sx={{ width: "25%" }}
        />
        <Tab
          label={translate("Comments")}
          {...a11yProps(3)}
          sx={{ width: "25%" }}
        />
      </Tabs>
      <CustomTabPanel value={tab} index={0}>
        <DataGridTable />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <Events />
      </CustomTabPanel>
    </Box>
  );
};

export default function Content() {
  const [selectedFlowmeterData, setSelectedFlowmeterData] = useState({});
  const [selectedFlowmeterId, setSelectedFlowmeterId] = useState("");
  const { hierarchy, currentRangeFlowmeters, colorConfigRanges, jwtToken } =
    useContext(AppContext);
  const [oldId, setOldId] = useState(localStorage.getItem("selectedDeviceId"));

  useEffect(() => {
    console.log("selectedDeviceId", localStorage.getItem("selectedDeviceId"));
    const interval = setInterval(() => {
      if (oldId !== localStorage.getItem("selectedDeviceId")) {
        setSelectedFlowmeterId(localStorage.getItem("selectedDeviceId"));
        setOldId(localStorage.getItem("selectedDeviceId"));
      }
      setSelectedFlowmeterId(localStorage.getItem("selectedDeviceId"));
    }, 500);

    return () => clearInterval(interval);
  }, [oldId]);

  useEffect(() => {
    console.log("selectedFlowmeterId", selectedFlowmeterId);
  }, [selectedFlowmeterId]);

  useEffect(() => {
    if (selectedFlowmeterId !== "") {
      axios
        .get(
          `${
            Actions.GetDataPoints
          }?TagIds=018f3b2f-ae9c-4cad-935c-24c70a54aa78&TagIds=018f3b2f-c468-4013-8f9c-54c163bfc388&TagIds=018f3b2f-fbb6-418c-9a4a-da1570ec470d&TagIds=6d3a692a-d85c-4206-b797-f023a9061d8a&DeviceId=${selectedFlowmeterId}&From=${new Date(
            currentRangeFlowmeters.middle
          ).toISOString()}&To=${new Date(
            currentRangeFlowmeters.end
          ).toISOString()}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          console.log("data range response", response.data);
        })
        .catch((error) => {});
    }
  }, [selectedFlowmeterId, currentRangeFlowmeters, jwtToken]);

  useEffect(() => {
    console.log("hierarchy.subAssets", hierarchy.subAssets);
    for (let i = 0; i < hierarchy.subAssets.length; i++) {
      if (hierarchy.subAssets[i].assetId === selectedFlowmeterId) {
        setSelectedFlowmeterData({
          ...hierarchy.subAssets[i],
          parent: hierarchy.subAssets[i].name,
          grandParent: hierarchy.name,
          liquid: Math.floor(Math.random() * 750 + 200),
          liquidTon: Math.floor(Math.random() * 750 + 200),
          oilTon: Math.floor(Math.random() * 300 + 50),
          targetLiquid: Math.floor(Math.random() * 750 + 200),
          targetLiquidTon: Math.floor(Math.random() * 750 + 200),
          targetOilTon: Math.floor(Math.random() * 300 + 50),
        });
        return;
      }
      for (let j = 0; j < hierarchy.subAssets[i].subAssets.length; j++) {
        if (
          hierarchy.subAssets[i].subAssets[j].assetId === selectedFlowmeterId
        ) {
          setSelectedFlowmeterData({
            ...hierarchy.subAssets[i].subAssets[j],
            parent: hierarchy.subAssets[i].name,
            grandParent: hierarchy.name,
            liquid: Math.floor(Math.random() * 350 + 50),
            liquidTon: Math.floor(Math.random() * 350 + 50),
            oilTon: Math.floor(Math.random() * 150 + 50),
            targetLiquid: Math.floor(Math.random() * 350 + 50),
            targetLiquidTon: Math.floor(Math.random() * 350 + 50),
            targetOilTon: Math.floor(Math.random() * 150 + 50),
          });
          return;
        }
        for (
          let k = 0;
          k < hierarchy.subAssets[i].subAssets[j].subAssets.length;
          k++
        ) {
          if (
            hierarchy.subAssets[i].subAssets[j].subAssets[k].assetId ===
            selectedFlowmeterId
          ) {
            setSelectedFlowmeterData({
              ...hierarchy.subAssets[i].subAssets[j].subAssets[k],
              parent: hierarchy.subAssets[i].subAssets[j].name,
              grandParent: hierarchy.subAssets[i].name,
              liquid: Math.floor(Math.random() * 100 + 50),
              liquidTon: Math.floor(Math.random() * 100 + 50),
              oilTon: Math.floor(Math.random() * 50 + 10),
              targetLiquid: Math.floor(Math.random() * 100 + 50),
              targetLiquidTon: Math.floor(Math.random() * 100 + 50),
              targetOilTon: Math.floor(Math.random() * 50 + 10),
            });
            return;
          }
        }
      }
    }
    // setSelectedFlowmeterData({
    //   ...hierarchy.subAssets[0],
    //   parent: hierarchy.subAssets[0].name,
    //   grandParent: hierarchy.name,
    //   liquid: Math.floor(Math.random() * 750 + 200),
    //   liquidTon: Math.floor(Math.random() * 750 + 200),
    //   oilTon: Math.floor(Math.random() * 300 + 50),
    //   targetLiquid: Math.floor(Math.random() * 750 + 200),
    //   targetLiquidTon: Math.floor(Math.random() * 750 + 200),
    //   targetOilTon: Math.floor(Math.random() * 300 + 50),
    // });
  }, [selectedFlowmeterId, hierarchy]);

  const navigate = useNavigate();
  const [dropdownItem, setDropdownItem] = useState("all");

  useEffect(() => {
    console.log("selectedFlowmeterData", selectedFlowmeterData);
  }, [selectedFlowmeterData]);

  const [pipes, setPipes] = useState([]);
  const [flatPipes, setFlatPipes] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${Actions.GetFlowmetersLatestDataPoints}?PageNumber=1&PageSize=99&TagIds=018f3b2f-ae9c-4cad-935c-24c70a54aa78&TagIds=018f3b2f-c468-4013-8f9c-54c163bfc388&TagIds=018f3b2f-fbb6-418c-9a4a-da1570ec470d`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        if (response && response.data) {
          setPipes(
            response.data.filter((pipe) => !pipe.flowmeter.name.includes("-"))
          );
          console.log(
            "new pipes",
            response.data.filter((pipe) => !pipe.flowmeter.name.includes("-"))
          );
        } else {
          setPipes([]);
        }
      });
  }, [jwtToken]);

  useEffect(() => {
    if (hierarchy && pipes.length > 0) {
      let pipesWithParents = hierarchy.subAssets.map((pun) =>
        pun.subAssets.map((gu) =>
          gu.subAssets.map((agzu) => {
            return {
              name: agzu.name,
              pipes: pipes
                .filter((pipe) => pipe.flowmeter.assetId === agzu.assetId)
                .map((pipe) => ({
                  ...pipe,
                  parent: {
                    name: agzu.name,
                    assetId: agzu.assetId,
                  },
                  grandParent: {
                    name: gu.name,
                    assetId: gu.assetId,
                  },
                  greatGrandParent: {
                    name: pun.name,
                    assetId: pun.assetId,
                  },
                  measured: {
                    liquid: parseInt(pipe.latestDataPoints[0].value),
                    liquidTon: parseInt(pipe.latestDataPoints[1].value),
                    oil: parseInt(pipe.latestDataPoints[2].value),
                  },
                  suggested: {
                    liquid:
                      parseInt(pipe.latestDataPoints[0].value) +
                      Math.floor(Math.random() * 5),
                    liquidTon:
                      parseInt(pipe.latestDataPoints[1].value) +
                      Math.floor(Math.random() * 5),
                    oil:
                      parseInt(pipe.latestDataPoints[2].value) +
                      Math.floor(Math.random() * 5),
                  },
                  corrected: {
                    liquid:
                      parseInt(pipe.latestDataPoints[0].value) +
                      Math.floor(Math.random() * 5),
                    liquidTon:
                      parseInt(pipe.latestDataPoints[1].value) +
                      Math.floor(Math.random() * 5),
                    oil:
                      parseInt(pipe.latestDataPoints[2].value) +
                      Math.floor(Math.random() * 5),
                  },
                })),
            };
          })
        )
      );

      pipesWithParents = pipesWithParents.flat().flat();
      console.log("pipesWithParents", [
        ...pipesWithParents
          .map((row) =>
            row.pipes.map((pipe) => {
              return {
                ...pipe,
                id: pipe.flowmeter.flowmeterId,
                checked: false,
              };
            })
          )
          .flat(),
      ]);
      setFlatPipes([
        ...pipesWithParents
          .map((row) =>
            row.pipes.map((pipe) => {
              console.log(
                "pipe.flowmeter.flowmeterId",
                pipe.flowmeter.flowmeterId
              );
              return {
                ...pipe,
                id: pipe.flowmeter.flowmeterId,
                checked: false,
              };
            })
          )
          .flat(),
      ]);
    }
  }, [hierarchy, pipes]);

  useEffect(() => {
    console.log("flatPipes", flatPipes);
  }, [flatPipes]);

  const BottomChart = ({ colors }) => {
    console.log(
      "selectedFlowmeterData from BottomChart",
      selectedFlowmeterData
    );
    return (
      Object.keys(selectedFlowmeterData).length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              top: 0,
              padding: "24px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                color: "#C0C0C0",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "36px",
                marginTop: "-24px",
              }}
            >
              {translate("Measurement")}
            </Typography>
            <FormControl
              sx={{
                width: "25%",
                marginLeft: "auto",
                color: "white",
              }}
              size="small"
            >
              <Select
                value={dropdownItem}
                onChange={(e) => setDropdownItem(e.target.value)}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"all"}>
                  {selectedFlowmeterData.name.includes("ЦДНГ")
                    ? translate("AllGU")
                    : selectedFlowmeterData.name.includes("ГУ")
                    ? translate("AllAGZU")
                    : translate("AllPipes")}
                </MenuItem>
                {selectedFlowmeterData.name.includes("ЗУ")
                  ? flatPipes
                      .filter(
                        (x) =>
                          x.parent.assetId === selectedFlowmeterData.assetId
                      )
                      .map((pipe) => (
                        <MenuItem value={pipe.id}>
                          {pipe.flowmeter.name}
                        </MenuItem>
                      ))
                  : selectedFlowmeterData.subAssets.map((subAsset) => (
                      <MenuItem value={subAsset.assetId}>
                        {subAsset.name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Box>
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
      )
    );
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            marginRight: "16px",
            marginLeft: "8px",
            gap: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/measurements/schematics")}
        >
          <KeyboardBackspace sx={{ color: "white", cursor: "pointer" }} />
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: 600,
              lineHeight: "25.5px",
              color: "white",
            }}
          >
            {translate("Back")}
          </Typography>
        </div>
        <MainDatePicker
          tabsDisplayed={false}
          pickerDisplayed={true}
          labelPosition="left"
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(6, 0.3fr)",
          gap: "24px",
          padding: "0px 24px 8px 24px",
          height: "79.5vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#151B28",
            borderRadius: "8px",
            gridArea: "1 / 1 / 2 / 6",
            display: "flex",
            flexDirection: "column",
            padding: "8px 16px 24px 24px",
            height: "max-content",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                padding: "3.3px",
                borderRadius: "6px",
                backgroundColor: selectedFlowmeterData.danger
                  ? "#DC2626"
                  : selectedFlowmeterData.alert
                  ? "#E99C26"
                  : "#15D28E",
              }}
            ></div>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "48px",
                  color: "white",
                  marginLeft: "16px",
                }}
              >
                {selectedFlowmeterData.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "48px",
                  color: "white",
                  marginLeft: "16px",
                }}
              >
                {`[${selectedFlowmeterData.parent} / ${selectedFlowmeterData.grandParent}]`}
              </Typography>
            </Box>
            <div style={{ marginLeft: "auto", marginTop: "4px" }}>
              <ConfigurationIcon svgFill={"none"} pathFill={"#D0D0D0"} />
            </div>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "21px",
                color: "#4C88FF",
                marginLeft: "8px",
                cursor: "pointer",
              }}
            >
              {translate("ViewSchematic")}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
                gap: "16px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ ...propNameStyle() }}>
                  {translate("Liquid")} ({translate("m^3")}){" "}
                  {translate("Status")}:
                </Typography>
                <Status
                  prop={"liquid"}
                  value={selectedFlowmeterData.liquid}
                  targetValue={selectedFlowmeterData.targetLiquid}
                  colorConfigRanges={colorConfigRanges}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ...propNameStyle() }}>
                  {translate("Liquid")} ({translate("ton")}){" "}
                  {translate("Status")}:
                </Typography>
                <Status
                  prop={"liquidTon"}
                  value={selectedFlowmeterData.liquidTon}
                  targetValue={selectedFlowmeterData.targetLiquidTon}
                  colorConfigRanges={colorConfigRanges}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ...propNameStyle() }}>
                  {translate("Oil")} ({translate("ton")}) {translate("Status")}:
                </Typography>
                <Status
                  prop={"oilTon"}
                  value={selectedFlowmeterData.oilTon}
                  targetValue={selectedFlowmeterData.targetOilTon}
                  colorConfigRanges={colorConfigRanges}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
                gap: "16px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ ...propNameStyle() }}>
                  {translate("Liquid")} ({translate("m^3")}):
                </Typography>
                <Typography
                  sx={{
                    ...propValueStyle(
                      {},
                      "liquid",
                      selectedFlowmeterData.liquid,
                      selectedFlowmeterData.targetLiquid,
                      colorConfigRanges
                    ),
                  }}
                >
                  {selectedFlowmeterData.liquid}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ...propNameStyle() }}>
                  {translate("Liquid")} ({translate("ton")}):
                </Typography>
                <Typography
                  sx={{
                    ...propValueStyle(
                      {},
                      "liquidTon",
                      selectedFlowmeterData.liquidTon,
                      selectedFlowmeterData.targetLiquidTon,
                      colorConfigRanges
                    ),
                  }}
                >
                  {selectedFlowmeterData.liquidTon}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ...propNameStyle() }}>
                  {translate("Oil")} ({translate("ton")}):
                </Typography>
                <Typography
                  sx={{
                    ...propValueStyle(
                      {},
                      "oilTon",
                      selectedFlowmeterData.oilTon,
                      selectedFlowmeterData.targetOilTon,
                      colorConfigRanges
                    ),
                  }}
                >
                  {selectedFlowmeterData.oilTon}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
                gap: "16px",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ ...propNameStyle() }}>Station:</Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  {selectedFlowmeterData.parent}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ...propNameStyle() }}>
                  {translate("Sector")}:
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "left",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  {selectedFlowmeterData.grandParent}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            gridArea: "2 / 1 / 7 / 6",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#151B28",
              borderRadius: "8px",
              display: "flex",
              position: "relative",
              height: "100%",
            }}
          >
            <BottomChart colors={["#4C88FF", "#FF964B", "#01B574"]} />
          </Box>
        </Box>
        <PageTabs />
      </Box>
    </Box>
  );
}
