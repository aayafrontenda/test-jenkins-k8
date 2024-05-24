import { Box, Button, Typography, darken, lighten } from "@mui/material";
import React from "react";
import { formatMessage as translate } from "devextreme/localization";

const acceptableDeviations = ["- 10 %", "- 5 %", "0 %", "5 %", "10 %"];

export default function AcceptableDeviation({
  style = {},
  acceptableDeviation,
  setAcceptableDeviation,
}) {
  return (
    <Box sx={{ ...style, display: "flex", alignItems: "center" }}>
      <Typography
        variant="waterfallParamsText"
        sx={{ fontWeight: 700, color: "#A0A0A0" }}
      >
        {translate("AcceptableDeviation")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginLeft: "16px",
        }}
      >
        {acceptableDeviations.map((deviation, _) => (
          <Button
            sx={{
              backgroundColor:
                deviation === acceptableDeviation ? "#151B28" : "transparent",
              color: "white",
            }}
            onClick={() => setAcceptableDeviation(deviation)}
          >
            {<Typography variant="waterfallParamsText">{deviation}</Typography>}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
