import React from "react";
import FilterIcon from "../../images/FilterIcon";
import { Button, Typography } from "@mui/material";
import { formatMessage as translate } from "devextreme/localization";

export default function FilterButton({ style = {}, displayLabel = true }) {
  return (
    <Button
      sx={{
        ...style,
        width: "95px",
        height: "40px",
        background: "transparent",
        display: "flex",
        gap: "8px",
        button: "none",
        outline: "none",
      }}
    >
      <FilterIcon fill={"white"} />
      {displayLabel && (
        <Typography variant="waterfallParamsText">
          {translate("Filters")}
        </Typography>
      )}
    </Button>
  );
}
