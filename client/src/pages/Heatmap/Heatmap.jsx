import React, { useContext, useEffect, useState } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import MainDatePicker from "../../components/shared-components/date-pickers/MainDatePicker";
import TreemapChart from "../../components/Heatmap/TreemapChart";
import ColorConfigurationButton from "../../components/shared-components/ColorConfigurationButton";
import { formatMessage as translate } from "devextreme/localization";
import AppContext from "../../context/app-context";
import axios from "axios";
import DevextremeHeatmap from "../../components/Heatmap/DevextremeHeatmap";
import { Actions } from "../../context/APIState";

const TreeMapWrapper = ({ generateData, forAll, punX, handleHitFlowmeter }) => {
  const [data, targetData] = generateData(punX, forAll);
  useEffect(() => {
    console.log("data", data);
    console.log("targetData", targetData);
  }, [data, targetData]);
  return (
    <DevextremeHeatmap
      data={data}
      targetData={targetData}
      colors={["#15D28E", "#E99C26", "#DC2626"]}
      parent={punX.name}
      handleHitFlowmeter={handleHitFlowmeter}
    />
  );
};

export default function Heatmap() {
  const {
    hierarchy,
    setHierarchy,
    setSelectedFlowmeterData,
    jwtToken,
    heatmapColorConfigRanges,
  } = useContext(AppContext);
  useEffect(() => {
    if (!hierarchy) {
      axios
        .get(Actions.GetFlowmeterHierarchy, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMThmMTE1YS1lMzhhLTQzYWYtYmRlZi0yMzhhODFhZGNjZDQiLCJlbWFpbCI6IlBWX0ZpcnN0QG1hbnVsb2lsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMDE4ZjExNWEtZTM4YS00M2FmLWJkZWYtMjM4YTgxYWRjY2Q0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiUFZfRmlyc3RAbWFudWxvaWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsIkp3dFRva2VuSWQiOiJkOTc5ZGE3ZS05MmE5LTQyNGMtYjkyNC1mYTZhYzA5NGEyZGIiLCJleHAiOjE3MTQ3MzQ4MzEsImlzcyI6Ik9wdGl3ZWxsIiwiYXVkIjoiT3B0aXdlbGwifQ._nNp_UbdNH9ytBSn1q_fYOLgvnq7oG62_uso0I_2uIY`,
          },
        })
        .then((response) => {
          console.log("response", response.data.assets[0]);
          setHierarchy(response.data.assets[0]);
        });
    }
  }, [hierarchy]);

  const [liquidData, setLiquidData] = useState([]);
  const [targetLiquidData, setTargetLiquidData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${Actions.GetFlowmetersLatestDataPoints}?PageNumber=1&PageSize=99&tagIds=018f3b2f-ae9c-4cad-935c-24c70a54aa78&tagIds=6d3a692a-d85c-4206-b797-f023a9061d8a`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        if (response && response.data) {
          const onlyGusAndAgzus = response.data.filter(
            (x) =>
              x.flowmeter.name.includes("ГУ") || x.flowmeter.name.includes("ЗУ")
          );
          setLiquidData([
            ...onlyGusAndAgzus.map((x) => {
              if (x.latestDataPoints.length > 0) {
                return {
                  id: x.flowmeter.flowmeterId,
                  name: x.flowmeter.name,
                  value: parseInt(x.latestDataPoints[0].value),
                };
              } else {
                return {
                  id: x.flowmeter.flowmeterId,
                  name: x.flowmeter.name,
                  value: Math.floor(Math.random() * 100) + 10,
                };
              }
            }),
          ]);
          setTargetLiquidData([
            ...onlyGusAndAgzus.map((x) => {
              if (x.latestDataPoints.length > 0) {
                return {
                  id: x.flowmeter.flowmeterId,
                  name: x.flowmeter.name,
                  value: parseInt(x.latestDataPoints[1].value),
                };
              } else {
                return {
                  id: x.flowmeter.flowmeterId,
                  name: x.flowmeter.name,
                  value: Math.floor(Math.random() * 100) + 10,
                };
              }
            }),
          ]);
          console.log("response.data", response.data);
        } else {
          setLiquidData([]);
          setTargetLiquidData([]);
        }
      });
  }, [jwtToken]);

  const [pun, setPun] = useState("All");

  const generateData = (parent, forAll = false) => {
    const liquidDataObj = {};
    const targetLiquidDataObj = {};

    for (let i = 0; i < liquidData.length; i++) {
      liquidDataObj[liquidData[i].name] = liquidData[i].value;
      targetLiquidDataObj[targetLiquidData[i].name] = targetLiquidData[i].value;
    }
    const data = [],
      targetData = {};
    if (forAll) {
      console.log("parent", parent);
      console.log("parent.subAssets", parent.subAssets);
      for (let p = 0; p < parent.subAssets.length; p++) {
        console.log("p", p);
        const pun = parent.subAssets[p];
        data.push({ name: pun.name, displayName: pun.name, items: [] });
        targetData[pun.name] = targetLiquidDataObj[pun.name]
          ? targetLiquidDataObj[pun.name]
          : Math.floor(Math.random() * 500) + 10;
        console.log("pun", pun);
        const gus = pun.subAssets;
        for (let j = 0; j < gus.length; j++) {
          console.log("gus[j]", gus[j]);
          data[data.length - 1].items.push({
            name: gus[j].name,
            displayName: gus[j].name,
            items: [],
          });
          targetData[gus[j].name] = targetLiquidDataObj[gus[j].name]
            ? targetLiquidDataObj[gus[j].name]
            : Math.floor(Math.random() * 150) + 10;
          const agzus = gus[j].subAssets;
          for (let i = 0; i < agzus.length; i++) {
            console.log("agzus[i]", agzus[i]);
            const targetValue = targetLiquidDataObj[agzus[i].name]
              ? targetLiquidDataObj[agzus[i].name]
              : Math.floor(Math.random() * 100) + 10;
            const value = liquidDataObj[agzus[i].name]
              ? liquidDataObj[agzus[i].name]
              : Math.floor(Math.random() * 100) + 10;
            const diff = Math.floor(
              (Math.abs(value - targetValue) / targetValue) * 100
            );
            data[data.length - 1].items[
              data[data.length - 1].items.length - 1
            ].items.push({
              name: agzus[i].name,
              displayName: value,
              value: value,
              color:
                diff < heatmapColorConfigRanges.agzuFlowRate[0]
                  ? "#15D28E"
                  : diff < heatmapColorConfigRanges.agzuFlowRate[1]
                  ? "#E99C26"
                  : "#DC2626",
            });
            targetData[agzus[i].name] = targetLiquidDataObj[agzus[i].name]
              ? targetLiquidDataObj[agzus[i].name]
              : Math.floor(Math.random() * 100) + 10;
          }
        }
      }
    } else {
      const gus = parent.subAssets;
      for (let j = 0; j < gus.length; j++) {
        data.push({ name: gus[j].name, displayName: gus[j].name, items: [] });
        targetData[gus[j].name] = targetLiquidDataObj[gus[j].name]
          ? targetLiquidDataObj[gus[j].name]
          : Math.floor(Math.random() * 150) + 10;
        const agzus = gus[j].subAssets;
        for (let i = 0; i < agzus.length; i++) {
          const value = liquidDataObj[agzus[i].name]
            ? liquidDataObj[agzus[i].name]
            : Math.floor(Math.random() * 100) + 10;
          const targetValue = targetLiquidDataObj[agzus[i].name]
            ? targetLiquidDataObj[agzus[i].name]
            : Math.floor(Math.random() * 100) + 10;
          const diff = Math.floor(
            (Math.abs(value - targetValue) / targetValue) * 100
          );
          data[data.length - 1].items.push({
            name: agzus[i].name,
            displayName: value,
            value: value,
            color:
              diff < heatmapColorConfigRanges.agzuFlowRate[0]
                ? "#15D28E"
                : diff < heatmapColorConfigRanges.agzuFlowRate[1]
                ? "#E99C26"
                : "#DC2626",
          });
          targetData[agzus[i].name] = targetLiquidDataObj[agzus[i].name]
            ? targetLiquidDataObj[agzus[i].name]
            : Math.floor(Math.random() * 100) + 10;
        }
      }
    }
    console.log("data", data);
    return [data, targetData];
  };

  // const puns = ["PUN-1", "PUN-2", "PUN-3", "PUN-4", "PUN-5", "PUN-6"];
  const puns = hierarchy.subAssets;

  const handleHitFlowmeter = (name) => {
    console.log("name", name);
    for (let i = 0; i < hierarchy.subAssets.length; i++) {
      if (hierarchy.subAssets[i].name === name) {
        localStorage.setItem(
          "selectedDeviceId",
          hierarchy.subAssets[i].assetId
        );
        return;
      }
      for (let j = 0; j < hierarchy.subAssets[i].subAssets.length; j++) {
        if (hierarchy.subAssets[i].subAssets[j].name === name) {
          localStorage.setItem(
            "selectedDeviceId",
            hierarchy.subAssets[i].subAssets[j].assetId
          );
          return;
        }
        for (
          let k = 0;
          k < hierarchy.subAssets[i].subAssets[j].subAssets.length;
          k++
        ) {
          if (hierarchy.subAssets[i].subAssets[j].subAssets[k].name === name) {
            localStorage.setItem(
              "selectedDeviceId",
              hierarchy.subAssets[i].subAssets[j].subAssets[k].assetId
            );
            return;
          }
        }
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "16px 32px",
        }}
      >
        <FormControl sx={{ width: "10%", color: "white" }} size="small">
          <Select
            value={pun}
            onChange={(e) => setPun(e.target.value)}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ height: "42px" }}
          >
            <MenuItem value={"All"}>{translate("AllPUN")}</MenuItem>
            {puns.map((punX) => (
              <MenuItem value={punX.name}>{punX.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <ColorConfigurationButton
          style={{ marginLeft: "auto" }}
          variant="heatmap"
        />
      </Box>
      <Box
        sx={{
          padding: "0px 16px 16px 16px",
          width: "100%",
          height: "79vh",
          display: "flex",
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        <Box
          sx={{
            backgroundColor: "transparent",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            padding: "8px",
          }}
        >
          <TreeMapWrapper
            generateData={generateData}
            forAll={pun === "All"}
            punX={
              pun === "All" ? hierarchy : puns.filter((x) => x.name === pun)[0]
            }
            handleHitFlowmeter={handleHitFlowmeter}
          />
        </Box>
      </Box>
    </>
  );
}
