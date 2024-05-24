import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Fade,
  Modal,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AppContext from "../../../context/app-context";
import { formatMessage as translate } from "devextreme/localization";
const getStyle = () => {
  return {
    position: "absolute",
    color: "white",
    top: 0,
    WebkitTransform: "none",
    transform: "none",
    borderRadius: "5px",
    minWidth: "330px",
    // boxShadow:
    //   "0px 11px 15px -7px rgba(0,0,0,0.7), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
    p: "8px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    height: "100%",
    alignItems: "center",
  };
};

const RangeSelector = ({
  title,
  defaultMin,
  defaultMax,
  min,
  setMin,
  max,
  setMax,
  style = {},
}) => {
  const valuetext = (value) => `${value}`;
  const marks = [
    {
      value: defaultMin,
      label: String(defaultMin),
    },
    {
      value: defaultMax,
      label: String(defaultMax),
    },
  ];
  const MAX_VALUE = 100;
  return (
    <Box
      sx={{
        ...style,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "24px 0px",
      }}
    >
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Typography variant="colorConfigPropName">{title}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}></Box>
      <Slider
        getAriaLabel={() => "Liquid, m^3"}
        orientation="horizontal"
        value={[min, max]}
        getAriaValueText={valuetext}
        onChange={(event) => {
          setMin(event.target.value[0]);
          setMax(event.target.value[1]);
        }}
        max={MAX_VALUE}
        sx={{
          "& .MuiSlider-thumb": {
            backgroundColor: "#4C88FF",
            top: "15px",
            width: "12px",
            height: "12px",
            borderRadius: "max",
            border: "2px solid white",
          },
          "& .MuiSlider-valueLabelOpen": {
            backgroundColor: "white",
            color: "black",
          },
          "& .MuiSlider-mark": {
            width: "2px",
            height: "14px",
            backgroundColor: "white",
            top: "15px",
            fontSize: "14px",
            fontWeight: "500",
          },
          "& .MuiSlider-rail": {
            height: "4px",
            backgroundImage: `
        linear-gradient(to right, #15D28E ${
          (defaultMin / MAX_VALUE) * 100
        }%, #E99C26 ${(defaultMin / MAX_VALUE) * 100}% ${
              (defaultMax / MAX_VALUE) * 100
            }%, #DC2626 ${(defaultMax / MAX_VALUE) * 100}%)
      `,
            opacity: "1",
          },
          "& .MuiSlider-track": {
            backgroundColor: "transparent",
            border: "none",
          },
        }}
        valueLabelDisplay="auto"
        marks={marks}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "-32px",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "18px",
            color: "#A0A0A0",
          }}
        >
          {translate("Normal")}
        </Typography>
        <Typography
          variant="colorConfigPropName"
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "18px",
            color: "#A0A0A0",
          }}
        >
          {translate("Critical")}
        </Typography>
      </Box>
    </Box>
  );
};

export function ColorConfiguration({
  colorConfigurationOpened,
  setColorConfigurationOpened,
}) {
  const { colorConfigRanges, setColorConfigRanges } = useContext(AppContext);
  const [minLiquid, setMinLiquid] = useState();
  const [maxLiquid, setMaxLiquid] = useState();
  const [minLiquidTon, setMinLiquidTon] = useState();
  const [maxLiquidTon, setMaxLiquidTon] = useState();
  const [minOilTon, setMinOilTon] = useState();
  const [maxOilTon, setMaxOilTon] = useState();

  useEffect(() => {
    setMinLiquid(colorConfigRanges.liquid[0]);
    setMaxLiquid(colorConfigRanges.liquid[1]);
    setMinLiquidTon(colorConfigRanges.liquidTon[0]);
    setMaxLiquidTon(colorConfigRanges.liquidTon[1]);
    setMinOilTon(colorConfigRanges.oilTon[0]);
    setMaxOilTon(colorConfigRanges.oilTon[1]);
  }, [colorConfigRanges]);

  const handleApply = () => {
    setColorConfigRanges({
      liquid: [minLiquid, maxLiquid],
      liquidTon: [minLiquidTon, maxLiquidTon],
      oilTon: [minOilTon, maxOilTon],
    });
    const newObj = {
      liquid: [minLiquid, maxLiquid],
      liquidTon: [minLiquidTon, maxLiquidTon],
      oilTon: [minOilTon, maxOilTon],
    };
    localStorage.setItem("colorConfigRanges", JSON.stringify(newObj));
    setColorConfigurationOpened(false);
  };
  return (
    <Modal
      open={colorConfigurationOpened}
      onClose={() => setColorConfigurationOpened(false)}
      aria-labelledby="modal-date-time-picker"
      sx={{
        ...getStyle(),
        "& .MuiBackdrop-root": {},
        "& .MuiModal-backdrop": {
          backgroundColor: "black",
          opacity: "0.5 !important",
          //   position: "absolute",
        },
        "& .MuiSvgIcon-root": {
          fill: "currentColor !important",
        },
      }}
    >
      <Fade in={colorConfigurationOpened}>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            bgcolor: "#151B28",
            p: "32px",
            width: "610px",
            borderRadius: "4px",
            display: "flex",
            gap: "8px",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="colorConfigTitle">
              {translate("LimitColorConfiguration")}
            </Typography>
            <Close
              onClick={() => setColorConfigurationOpened(false)}
              sx={{
                "&": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
          <RangeSelector
            title="Liquid, m³"
            defaultMin={colorConfigRanges.liquid[0]}
            defaultMax={colorConfigRanges.liquid[1]}
            min={minLiquid}
            setMin={setMinLiquid}
            max={maxLiquid}
            setMax={setMaxLiquid}
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
          <RangeSelector
            title="Liquid, ton"
            defaultMin={colorConfigRanges.liquidTon[0]}
            defaultMax={colorConfigRanges.liquidTon[1]}
            min={minLiquidTon}
            setMin={setMinLiquidTon}
            max={maxLiquidTon}
            setMax={setMaxLiquidTon}
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
          <RangeSelector
            title="Oil, ton"
            defaultMin={colorConfigRanges.oilTon[0]}
            defaultMax={colorConfigRanges.oilTon[1]}
            min={minOilTon}
            setMin={setMinOilTon}
            max={maxOilTon}
            setMax={setMaxOilTon}
          />
          <Box
            sx={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}
          >
            <Button
              sx={{
                color: "white",
                border: "1px solid white",
                padding: "8px, 16px, 8px, 16px",
                borderRadius: "4px",
                width: "40%",
              }}
              onClick={() => setColorConfigurationOpened(false)}
            >
              <Typography variant="colorConfigButtonText">
                {translate("DiscardChanges")}
              </Typography>
            </Button>
            <Button
              sx={{
                backgroundColor: "#4C88FF",
                color: "white",
                padding: "8px, 16px, 8px, 16px",
                borderRadius: "4px",
                width: "40%",
              }}
              onClick={() => handleApply()}
            >
              <Typography variant="colorConfigButtonText">
                {translate("ApplyChanges")}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
