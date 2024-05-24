import React, { useEffect, useState } from "react";
import ColorConfigurationIcon from "../../images/ColorConfigurationIcon";
import { Button, Typography } from "@mui/material";
import { ColorConfiguration } from "../Measurements/Schematics/ColorConfiguration";
import { ColorConfigurationHeatmap } from "../Heatmap/ColorConfiguration";
import { formatMessage as translate } from "devextreme/localization";

export default function ColorConfigurationButton({
  style = {},
  variant = "default",
}) {
  const [colorConfigurationOpened, setColorConfigurationOpened] =
    useState(false);
  return (
    <Button
      sx={{
        ...style,
        background: "transparent",
        display: "flex",
        width: "193px",
        height: "40px",
        padding: "4px 8px 4px 8px",
      }}
      id="colorConfigurationButton"
      onClick={(e) => setColorConfigurationOpened((prev) => !prev)}
    >
      <ColorConfigurationIcon fill={"white"} />
      <Typography
        variant="waterfallParamsText"
        marginLeft="8px"
        sx={{ textWrap: "nowrap" }}
      >
        {translate("ColorConfiguration")}
      </Typography>
      {variant === "default" ? (
        <ColorConfiguration
          colorConfigurationOpened={colorConfigurationOpened}
          setColorConfigurationOpened={setColorConfigurationOpened}
        />
      ) : (
        <ColorConfigurationHeatmap
          colorConfigurationOpened={colorConfigurationOpened}
          setColorConfigurationOpened={setColorConfigurationOpened}
        />
      )}
    </Button>
  );
}
