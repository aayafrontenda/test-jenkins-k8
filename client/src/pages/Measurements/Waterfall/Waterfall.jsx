import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../../../components/shared-components/Sidebar";
import RecordsCards from "../../../components/Measurements/Waterfall/RecordsCards";
import FilterButton from "../../../components/shared-components/FilterButton";
import AcceptableDeviation from "../../../components/Measurements/Waterfall/AcceptableDeviation";
import AppContext from "../../../context/app-context";
import axios from "axios";
import ComponentWithSidebar from "../../../components/shared-components/ComponentWithSidebar";
import WaterfallContent from "../../../components/Measurements/Waterfall/WaterfallContent";
export default function Waterfall() {
  return (
    <ComponentWithSidebar
      boxStyle={{ display: "flex", gap: "16px", marginTop: "-41px" }}
      sidebarStyle={{ height: "82.85vh" }}
      children={<WaterfallContent />}
    />
  );
}
