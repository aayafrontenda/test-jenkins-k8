import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/app-context";
import RecordsCards from "./RecordsCards";

export default function WaterfallContent() {
  const { hierarchy } = useContext(AppContext);
  const [selectedFlowmeterId, setSelectedFlowmeterId] = useState("");
  const [oldId, setOldId] = useState(
    localStorage.getItem("selectedFlowmeterId")
  );

  useEffect(() => {
    console.log(
      "selectedFlowmeterId",
      localStorage.getItem("selectedFlowmeterId")
    );
    const interval = setInterval(() => {
      if (oldId !== localStorage.getItem("selectedFlowmeterId")) {
        setSelectedFlowmeterId(localStorage.getItem("selectedFlowmeterId"));
        setOldId(localStorage.getItem("selectedFlowmeterId"));
      }
      setSelectedFlowmeterId(localStorage.getItem("selectedFlowmeterId"));
    }, 200);

    return () => clearInterval(interval);
  }, [oldId]);
  const [selectedFlowmeter, setSelectedFlowmeter] = useState({});

  const setData = () => {
    for (let i = 0; i < hierarchy.subAssets.length; i++) {
      for (let j = 0; j < hierarchy.subAssets[i].subAssets.length; j++) {
        for (
          let k = 0;
          k < hierarchy.subAssets[i].subAssets[j].subAssets.length;
          k++
        ) {
          if (
            hierarchy.subAssets[i].subAssets[j].subAssets[k].assetId ===
            selectedFlowmeterId
          ) {
            setSelectedFlowmeter(
              hierarchy.subAssets[i].subAssets[j].subAssets[k]
            );
            return;
          }
        }
      }
    }
    setSelectedFlowmeter(hierarchy.subAssets[0].subAssets[0].subAssets[0]);
  };
  useEffect(() => {
    setData();
  }, [selectedFlowmeterId, hierarchy, selectedFlowmeter]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "24px 0px 9px 9px !important",
        height: "83.5vh",
        // overflowX: "scroll",
        // width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="waterfallTitle">
          {selectedFlowmeter.name}
        </Typography>
        {/* <FilterButton
            style={{
              marginLeft: "24px",
            }}
          /> */}
      </Box>
      <RecordsCards
        width={"100%"}
        cardWidth={395 + 16}
        cardHeight={"100%"}
        parent={selectedFlowmeter.name}
      />
    </Box>
  );
}
