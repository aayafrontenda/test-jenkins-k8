import { Box } from "@mui/material";
import React from "react";
import ComponentWithSidebar from "../../../components/shared-components/ComponentWithSidebar";
import Content from "../../../components/SelectedPage/Content";

export default function SelectedPage() {
  return (
    <Box sx={{ display: "flex", padding: "0px !importnant" }}>
      <ComponentWithSidebar
        sidebarStyle={{ height: "89.5vh", marginTop: "0px" }}
        component="SelectedPage"
        boxStyle={{ display: "flex", width: "100%" }}
        children={<Content />}
      />
      {/* <Sidebar
          style={{ marginTop: 0, height: "89.75vh" }}
        /> */}
    </Box>
  );
}
