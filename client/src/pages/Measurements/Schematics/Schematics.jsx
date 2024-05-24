import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  darken,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import WarningIcon from "../../../images/WarningIcon";
import Warning from "../../../images/Warning";
import AppContext from "../../../context/app-context";
import { useNavigate } from "react-router-dom";
import { formatMessage as translate } from "devextreme/localization";
import axios from "axios";
import { Actions } from "../../../context/APIState";

const DataCard = ({ data, isPun }) => {
  const navigate = useNavigate();
  const { colorConfigRanges } = useContext(AppContext);
  const diff = Math.floor(
    (Math.abs(data.liquid - data.targetLiquid) / data.targetLiquid) * 100
  );
  const alert =
    diff >= colorConfigRanges.liquid[0] && diff <= colorConfigRanges.liquid[1];
  const danger = diff > colorConfigRanges.liquid[1];
  console.log("data", data);
  return (
    <Card
      sx={{
        width: isPun ? "100%" : "280px",
        height: isPun ? "calc(100% - 14px)" : "180px",
        borderRadius: "4px",
        border: `3px solid ${
          !alert && !danger ? "#15D28E" : alert ? "#E99C26" : "#DC2626"
        }`,
        backgroundImage: "none",
        padding: "8px",
        m: "8px",
        backgroundColor: danger ? "#DC2626" : "#151B28",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: darken(danger ? "#DC2626" : "#151B28", 0.2),
        },
      }}
      onClick={() => {
        localStorage.setItem("selectedDeviceId", data.assetId);
        navigate(
          "/measurements/selected/" +
            encodeURIComponent(data.name.replace(/\s+/g, ""))
        );
      }}
    >
      <CardContent
        sx={{
          padding: "4px",
          "&:last-child": {
            paddingBottom: "0px",
          },
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "max-content",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              component="p"
              sx={{
                color: alert ? "#E99C26" : "white",
              }}
            >
              {data.name}
            </Typography>
            {alert && <WarningIcon />}
            {danger && <Warning fill={"white"} stroke={"#DC2626"} />}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            marginTop: "2px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "8px 0px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Typography
              variant="measurementProp"
              component="p"
              sx={{ color: danger ? "white" : "#A0A0A0" }}
            >
              {translate("Liquid")} ({translate("m^3")})
            </Typography>
            <Typography
              variant="measurementValue"
              component="p"
              sx={{
                display: "flex",
                gap: "2px",
                "& > p": {
                  padding: 0,
                  margin: 0,
                },
                color: !danger ? "#4C88FF" : "white",
              }}
            >
              {data.name.includes("ГУ") || data.name.includes("ЦДНГ") ? (
                <>
                  <p>{data.calculatedLiquid}</p>
                  <p>/</p>
                  <p>{data.suggestedLiquid}</p>
                </>
              ) : (
                `${data.liquid}`
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "12px 0px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Typography
              variant="measurementProp"
              component="p"
              sx={{ color: danger ? "white" : "#A0A0A0" }}
            >
              {translate("Liquid")} ({translate("ton")})
            </Typography>
            <Typography
              variant="measurementValue"
              component="p"
              sx={{
                display: "flex",
                gap: "2px",
                "& > p": {
                  padding: 0,
                  margin: 0,
                },
                color: !danger ? "#01B574" : "white",
              }}
            >
              {data.name.includes("ГУ") || data.name.includes("ЦДНГ") ? (
                <>
                  <p>{data.calculatedLiquidTon}</p>
                  <p>/</p>
                  <p>{data.suggestedLiquidTon}</p>
                </>
              ) : (
                `${data.liquidTon}`
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 0px",
            }}
          >
            <Typography
              variant="measurementProp"
              component="p"
              sx={{ color: danger ? "white" : "#A0A0A0" }}
            >
              {translate("Oil")} ({translate("ton")})
            </Typography>
            <Typography
              variant="measurementValue"
              component="p"
              sx={{
                display: "flex",
                gap: "2px",
                "& > p": {
                  padding: 0,
                  margin: 0,
                },
                color: !danger ? "#FF964B" : "white",
              }}
            >
              {data.name.includes("ГУ") || data.name.includes("ЦДНГ") ? (
                <>
                  <p>{data.calculatedOil}</p>
                  <p>/</p>
                  <p>{data.suggestedOil}</p>
                </>
              ) : (
                `${data.oil}`
              )}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function Schematics() {
  const { hierarchy, setHierarchy, jwtToken } = useContext(AppContext);
  useEffect(() => {
    if ((!hierarchy || hierarchy.length === 0) && jwtToken) {
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
  }, [hierarchy, jwtToken]);

  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("hierarchy", hierarchy);
    if (hierarchy) {
      let modifiedData = hierarchy.subAssets.map((pun) => {
        return {
          ...pun,
          oil: 2,
          liquid: 101,
          targetLiquid: 101,
          liquidTon: 103,
          subAssets: pun.subAssets.map((gu) => {
            return {
              ...gu,
              oil: 2,
              liquid: 101,
              targetLiquid: 101,
              liquidTon: 103,
              subAssets: gu.subAssets.map((agzu) => {
                return {
                  ...agzu,
                  oil: 2,
                  liquid: 101,
                  targetLiquid: 101,
                  liquidTon: 103,
                };
              }),
            };
          }),
        };
      });
      setData(modifiedData);
    }
  }, [hierarchy]);

  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    if (jwtToken && !fetched) {
      axios
        .get(
          `${Actions.GetFlowmetersLatestDataPoints}?PageNumber=1&PageSize=99&tagIds=018f3b2f-ae9c-4cad-935c-24c70a54aa78&tagIds=018f3b2f-c468-4013-8f9c-54c163bfc388&tagIds=018f3b2f-fbb6-418c-9a4a-da1570ec470d&tagIds=6d3a692a-d85c-4206-b797-f023a9061d8a`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          if (!response) return;
          setFetched(true);
          console.log("latest data points response", response.data);
          const responseObject = {};
          response.data.forEach((dataPiece) => {
            if (!responseObject[dataPiece.flowmeter.name]) {
              responseObject[dataPiece.flowmeter.name] = { ...dataPiece };
            }
            if (
              responseObject[dataPiece.flowmeter.name].latestDataPoints.length >
              0
            ) {
              responseObject[dataPiece.flowmeter.name].liquid = parseInt(
                dataPiece.latestDataPoints[0].value
              );
              responseObject[dataPiece.flowmeter.name].liquidTon = parseInt(
                dataPiece.latestDataPoints[1].value
              );
              responseObject[dataPiece.flowmeter.name].oil = parseInt(
                dataPiece.latestDataPoints[2].value
              );
              responseObject[dataPiece.flowmeter.name].targetLiquid = parseInt(
                dataPiece.latestDataPoints[3].value
              );
            } else {
              responseObject[dataPiece.flowmeter.name].liquid =
                Math.floor(Math.random() * 100) + 1;
              responseObject[dataPiece.flowmeter.name].liquidTon =
                Math.floor(Math.random() * 100) + 1;
              responseObject[dataPiece.flowmeter.name].oil =
                Math.floor(Math.random() * 20) + 1;
              responseObject[dataPiece.flowmeter.name].targetLiquid =
                Math.floor(Math.random() * 100) + 1;
            }
          });
          console.log("responseObject", responseObject);
          if (response.data) {
            setData((prevData) => [
              ...prevData
                .map((pun) => {
                  console.log("pun.subAssets.length", pun.subAssets.length);
                  return {
                    ...pun,
                    liquid: responseObject[pun.name]
                      ? responseObject[pun.name].liquid
                      : pun.liquid,
                    targetLiquid: responseObject[pun.name]
                      ? responseObject[pun.name].targetLiquid
                      : pun.targetLiquid,
                    liquidTon: responseObject[pun.name]
                      ? responseObject[pun.name].liquidTon
                      : pun.liquidTon,
                    oil: responseObject[pun.name]
                      ? responseObject[pun.name].oil
                      : pun.oil,
                    subAssets: pun.subAssets.map((gu) => {
                      console.log("passing gu");
                      console.log("gu found", gu, responseObject[gu.name]);
                      return {
                        ...gu,
                        liquid: responseObject[gu.name]
                          ? responseObject[gu.name].liquid
                          : gu.liquid,
                        targetLiquid: responseObject[pun.name]
                          ? responseObject[pun.name].targetLiquid
                          : pun.targetLiquid,
                        liquidTon: responseObject[gu.name]
                          ? responseObject[gu.name].liquidTon
                          : gu.liquidTon,
                        oil: responseObject[gu.name]
                          ? responseObject[gu.name].oil
                          : gu.oil,
                        subAssets: gu.subAssets.map((flowmeter) => {
                          console.log("passing flowmeter");

                          console.log(
                            "flowmeter found",
                            flowmeter,
                            responseObject[flowmeter.name]
                          );
                          return {
                            ...flowmeter,
                            liquid: responseObject[flowmeter.name]
                              ? responseObject[flowmeter.name].liquid
                              : flowmeter.liquid,
                            targetLiquid: responseObject[pun.name]
                              ? responseObject[pun.name].targetLiquid
                              : pun.targetLiquid,
                            liquidTon: responseObject[flowmeter.name]
                              ? responseObject[flowmeter.name].liquidTon
                              : flowmeter.liquidTon,
                            oil: responseObject[flowmeter.name]
                              ? responseObject[flowmeter.name].oil
                              : flowmeter.oil,
                          };
                        }),
                      };
                    }),
                  };
                })
                .map((pun) => {
                  let calculatedPunLiquid = 0,
                    calculatedPunOil = 0,
                    calculatedLiquidPunTon = 0;

                  return {
                    ...pun,
                    subAssets: pun.subAssets.map((gu) => {
                      let calculatedLiquid = 0,
                        calculatedOil = 0,
                        calculatedLiquidTon = 0;
                      return {
                        ...gu,
                        subAssets: (gu.subAssets = gu.subAssets.map((agzu) => {
                          calculatedLiquid += agzu.liquid;
                          calculatedOil += agzu.oil;
                          calculatedLiquidTon += agzu.liquidTon;
                          calculatedLiquidPunTon += agzu.liquid;
                          calculatedPunLiquid += agzu.oil;
                          calculatedPunOil += agzu.oil;
                          return {
                            ...agzu,
                          };
                        })),
                        calculatedLiquid: calculatedLiquid,
                        calculatedOil: calculatedOil,
                        calculatedLiquidTon: calculatedLiquidTon,
                        suggestedLiquid: calculatedLiquid + 2,
                        suggestedOil: calculatedOil + 2,
                        suggestedLiquidTon: calculatedLiquidTon + 2,
                      };
                    }),
                    calculatedLiquid: calculatedPunLiquid,
                    calculatedOil: calculatedPunOil,
                    calculatedLiquidTon: calculatedLiquidPunTon,
                    suggestedLiquid: calculatedPunLiquid + 2,
                    suggestedOil: calculatedPunOil + 2,
                    suggestedLiquidTon: calculatedLiquidPunTon + 2,
                  };
                }),
            ]);
          }
        });
    }
  }, [data, jwtToken, fetched]);

  const [pun, setPun] = useState("All");
  useEffect(() => {
    console.log("data", data);
    console.log("pun", pun);
    console.log(
      "data.filter((x) => x.name.includes(pun)",
      data.filter((x) => x.name.includes(pun))
    );
  }, [data, pun]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "-82px",
        padding: "0px",
      }}
    >
      <FormControl
        sx={{
          width: "10%",
          marginLeft: "auto",
          color: "white",
          marginRight: "16px",
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
            <MenuItem value={punX.name}>{punX.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {(pun === "All" ? data : data.filter((x) => x.name.includes(pun))).map(
        (punX, areaIndex) => {
          return (
            <Box
              sx={{
                display: "flex",
                height: "100%",
                p: 0,
                marginBottom: "12px",
                flexDirection: "row-reverse",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "80%",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {punX.subAssets.map((gu) => (
                  <Box
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-end",
                      flexDirection: "row-reverse",
                    }}
                  >
                    {gu.subAssets.map((flowmeter, subAreaIndex) => {
                      // Check if the current card is `PUN-1` to adjust the grid item accordingly
                      return (
                        <Box
                          sx={{
                            padding: "0px !important",
                          }}
                          key={flowmeter.assetId}
                        >
                          <DataCard data={flowmeter} />
                        </Box>
                      );
                    })}
                    <DataCard data={gu} key={gu.assetId} />
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  width: "20%",
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                }}
              >
                <DataCard data={punX} isPun={true} />
              </Box>
            </Box>
          );
        }
      )}
    </Box>
  );
}
