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
import AppContext from "../../context/app-context";
import { formatMessage as translate } from "devextreme/localization";
const getStyle = () => {
  return {
    position: "absolute",
    color: "white",
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
  defaultMin,
  defaultMax,
  title,
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <input
          id="min"
          type="number"
          value={min}
          min={0}
          max={MAX_VALUE}
          onChange={(e) => setMin(e.target.value)}
          style={{
            width: "30%",
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "12px",
            color: "#232020",
            fontSize: "16px",
            fontWeight: "400",
            outline: "none",
            border: "none",
          }}
        />
        <input
          id="max"
          min={0}
          max={MAX_VALUE}
          style={{
            width: "30%",
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "12px",
            color: "#232020",
            fontSize: "16px",
            fontWeight: "400",
            outline: "none",
            border: "none",
          }}
          value={max}
          onChange={(e) => setMax(e.target.value)}
          type="number"
        /> */}
      </Box>
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
          (min / MAX_VALUE) * 100
        }%, #E99C26 ${(min / MAX_VALUE) * 100}% ${
              (max / MAX_VALUE) * 100
            }%, #DC2626 ${(max / MAX_VALUE) * 100}%)
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

export function ColorConfigurationHeatmap({
  colorConfigurationOpened,
  setColorConfigurationOpened,
}) {
  const { heatmapColorConfigRanges, setHeatmapColorConfigRanges } =
    useContext(AppContext);
  const [minAgzuFlowRate, setMinAgzuFlowRate] = useState();
  const [maxAgzuFlowRate, setMaxAgzuFlowRate] = useState();
  const [minGuFlowRate, setMinGuFlowRate] = useState();
  const [maxGuFlowRate, setMaxGuFlowRate] = useState();

  useEffect(() => {
    setMinGuFlowRate(heatmapColorConfigRanges.guFlowRate[0]);
    setMaxGuFlowRate(heatmapColorConfigRanges.guFlowRate[1]);
    setMinAgzuFlowRate(heatmapColorConfigRanges.agzuFlowRate[0]);
    setMaxAgzuFlowRate(heatmapColorConfigRanges.agzuFlowRate[1]);
    console.log("heatmapColorConfigRanges", heatmapColorConfigRanges);
  }, [heatmapColorConfigRanges]);

  const handleApply = () => {
    setHeatmapColorConfigRanges({
      guFlowRate: [minGuFlowRate, maxGuFlowRate],
      agzuFlowRate: [minAgzuFlowRate, maxAgzuFlowRate],
    });
    const newObj = {
      guFlowRate: [minGuFlowRate, maxGuFlowRate],
      agzuFlowRate: [minAgzuFlowRate, maxAgzuFlowRate],
    };
    localStorage.setItem("heatmapColorConfigRanges", JSON.stringify(newObj));
    setColorConfigurationOpened(false);
  };
  return (
    <Modal
      open={colorConfigurationOpened}
      onClose={() => setColorConfigurationOpened(false)}
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
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="colorConfigTitle">
              {translate("FlowrateColorConfiguration")}
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
            title={`${translate("GUFlowRate")}, ${translate(
              "m^3"
            )} / ${translate("day")}`}
            defaultMin={heatmapColorConfigRanges.guFlowRate[0]}
            defaultMax={heatmapColorConfigRanges.guFlowRate[1]}
            min={minGuFlowRate}
            setMin={setMinGuFlowRate}
            max={maxGuFlowRate}
            setMax={setMaxGuFlowRate}
            style={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "4px 0px",
            }}
          />
          <RangeSelector
            title={`${translate("AGZUFlowRate")}, ${translate(
              "m^3"
            )} / ${translate("day")}`}
            defaultMin={heatmapColorConfigRanges.agzuFlowRate[0]}
            defaultMax={heatmapColorConfigRanges.agzuFlowRate[1]}
            min={minAgzuFlowRate}
            setMin={setMinAgzuFlowRate}
            max={maxAgzuFlowRate}
            setMax={setMaxAgzuFlowRate}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}
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
