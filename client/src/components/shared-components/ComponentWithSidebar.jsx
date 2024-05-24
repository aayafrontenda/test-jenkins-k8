import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function ComponentWithSidebar({
  children,
  boxStyle = {},
  sidebarStyle = {},
  component = "Waterfall",
}) {
  //   useEffect(() => {
  //     console.log("hierarchy init", hierarchy);
  //     console.log("selectedData init", selectedFlowmeterDataSidebar);
  //     if (hierarchy && selectedFlowmeterDataSidebar.name === "") {
  //       setSelected(hierarchy.subAssets[0].subAssets[0].subAssets[0].assetId);
  //       setSelectedFlowmeterDataSidebar(
  //         hierarchy.subAssets[0].subAssets[0].subAssets[0]
  //       );
  //     }
  //   }, [hierarchy, selectedFlowmeterDataSidebar]);

  return (
    <Box sx={{ ...boxStyle }}>
      <Sidebar style={{ ...sidebarStyle }} component={component} />
      {children}
    </Box>
  );
}
