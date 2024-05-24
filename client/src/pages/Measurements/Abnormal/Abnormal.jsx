import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import Table from "../../../components/Measurements/Abnormal/Table";
import { formatMessage as translate } from "devextreme/localization";
import AppContext from "../../../context/app-context";
import axios from "axios";
import DataGridTable from "../../../components/Measurements/Abnormal/DataGridTable";
import { Actions } from "../../../context/APIState";

export default function Abnormal() {
  const { hierarchy, setHierarchy, jwtToken } = useContext(AppContext);
  const [flatPipes, setFlatPipes] = useState([]);
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

  const [pipes, setPipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${Actions.GetFlowmetersLatestDataPoints}?PageNumber=1&PageSize=99&tagIds=018f3b2f-ae9c-4cad-935c-24c70a54aa78&tagIds=018f3b2f-c468-4013-8f9c-54c163bfc388&tagIds=018f3b2f-fbb6-418c-9a4a-da1570ec470d`,
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

  const [pun, setPun] = useState("All");
  const [gu, setGu] = useState("All");
  const [agzu, setAgzu] = useState("All");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "-82px" }}>
      <Box sx={{ display: "flex", gap: "16px" }}>
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
      {((flatPipes &&
        flatPipes.length > 0 &&
        pun === "All" &&
        gu === "All" &&
        agzu === "All") ||
        pun !== "All" ||
        gu !== "All" ||
        agzu !== "All") && (
        <DataGridTable
          flatPipes={flatPipes
            .filter((x) =>
              pun === "All" ? true : x.greatGrandParent.assetId === pun
            )
            .filter((x) => (gu === "All" ? true : x.grandParent.assetId === gu))
            .filter((x) => (agzu === "All" ? true : x.parent.assetId === agzu))}
        />
      )}
      <Box
        sx={{
          display: "flex",
          marginTop: "16px",
          justifyContent: "flex-end",
          backgroundColor: "#151B28",
          width: "100%",
          padding: "16px",
          gap: "16px",
          position: "fixed",
          bottom: 0,
          right: 0,
        }}
      >
        <Button
          sx={{
            width: "156px",
            height: "40px",
            padding: "8px 16px 8px 16px",
            borderRadius: "4px",
            border: "1px solid white",
            color: "white",
            fontSize: "16px",
            fontWeight: 500,
            backgroundColor: "transparent",
            lineHeight: "16px",
          }}
        >
          {translate("RevertChanges")}
        </Button>
        <Button
          sx={{
            width: "271px",
            height: "40px",
            padding: "8px 16px 8px 16px",
            borderRadius: "4px",
            backgroundColor: "#2585DA",
            fontSize: "16px",
            fontWeight: 500,
            color: "white",
            lineHeight: "16px",
          }}
        >
          {translate("AcceptSuggestedParameters")}
        </Button>
      </Box>
    </Box>
  );
}
