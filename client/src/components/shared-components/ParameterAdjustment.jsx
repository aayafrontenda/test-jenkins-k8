import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/app-context";
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
    alignItems: "center",
    gap: "8px",
    height: "100%",
  };
};

const getBackgroundColor = (value, suggestedValue, acceptableDeviation) => {
  const bg = {
    success: "#5AC15A",
    warning: "#F2C230",
    danger: "#FF6347",
  };
  const diff = (value - suggestedValue) / suggestedValue;
  // console.log("diff", diff);
  switch (acceptableDeviation) {
    case "- 10 %":
      return diff < -0.1 || diff > 0
        ? bg.danger
        : diff === 0
        ? bg.success
        : bg.warning;
    case "- 5 %":
      return diff < -0.05 || diff > 0
        ? bg.danger
        : diff === 0
        ? bg.success
        : bg.warning;
    case "0 %":
      return diff !== 0 ? bg.danger : bg.success;
    case "5 %":
      return diff > 0.05 || diff < 0
        ? bg.danger
        : diff === 0
        ? bg.success
        : bg.warning;
    case "10 %":
      return diff > 0.1 || diff < 0
        ? bg.danger
        : diff === 0
        ? bg.success
        : bg.warning;
    default:
      return bg.danger;
  }
};

const propNames = ["Oil", "Liquid", "Liquid"];
const measures = ["ton", "m³", "ton"];

export default function ParameterAdjustment({ flatPipes, setFlatPipes }) {
  const {
    abnormalSelectedIndex,
    parameterAdjustmentOpened,
    setParameterAdjustmentOpened,
  } = useContext(AppContext);
  const [index, setIndex] = useState(0);
  const [newData, setNewData] = useState({
    pipe: {},
    currentValue: 0,
    suggestedValues: [0, 0],
  });
  const [userValue, setUserValue] = useState(0);

  useEffect(() => {
    console.log("parameterAdjustmentOpened", parameterAdjustmentOpened);
  }, [parameterAdjustmentOpened]);

  useEffect(() => {
    console.log("abnormalSelectedIndex", abnormalSelectedIndex);
  }, [abnormalSelectedIndex]);

  /*
  useEffect(() => {
    setNewData({
      pipe: flatPipes[abnormalSelectedIndex],
      currentValue:
        flatPipes[abnormalSelectedIndex].measured[
          index === 0 ? "oil" : index === 1 ? "liquid" : "liquidTon"
        ],
      suggestedValues: [
        flatPipes[abnormalSelectedIndex].suggested[
          index === 0 ? "oil" : index === 1 ? "liquid" : "liquidTon"
        ],
        flatPipes[abnormalSelectedIndex].suggested[
          index === 0 ? "oil" : index === 1 ? "liquid" : "liquidTon"
        ] + 5,
      ],
    });
  }, [flatPipes]);


  useEffect(() => {
    setUserValue(newData.currentValue);
  }, [newData]);
   
  const handleApply = () => {
    setFlatPipes((prev) => {
      console.log("updating flatPipes");
      const newFlatPipes = [...prev];
      const correctedProp =
        propNames[index] === "Oil"
          ? "oil"
          : propNames[index] === "Liquid" && measures[index] === "m³"
          ? "liquid"
          : "liquidTon";
      newFlatPipes[abnormalSelectedIndex].corrected[correctedProp] = userValue;
      return [...newFlatPipes];
    });
    setParameterAdjustmentOpened(false);
  };
  */

  const handleApply = () => {};
  return (
    <Modal
      open={parameterAdjustmentOpened}
      // open={true}
      //   onClick={(e) => e.stopPropagation()}
      onClose={() => setParameterAdjustmentOpened(false)}
      sx={{
        ...getStyle(),
        "& .MuiBackdrop-root": {},
        "& .MuiModal-backdrop": {
          backgroundColor: "rgba(0, 0, 0, 0.3) !important",
          opacity: "0.9 !important",
          //   position: "absolute",
        },
        "& .MuiSvgIcon-root": {
          fill: "currentColor !important",
        },
      }}
    >
      {/* <Fade in={parameterAdjustmentOpened} unmountOnExit> */}
      <Box
        /* onClick={(e) => e.stopPropagation()} */
        sx={{
          bgcolor: "#151B28",
          p: "16px",
          width: "440px",
          borderRadius: "4px",
          borderColor: "transparent",
          display: "flex",
          gap: "16px",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="colorConfigTitle"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {translate("CorrectToPipe")} {newData.pipe.name},{" "}
            {newData.pipe.parent}
          </Typography>
          <Close
            onClick={() => setParameterAdjustmentOpened(false)}
            sx={{
              "&": {
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              marginBottom: "16px",
            }}
          >
            <Typography>{translate("CorrectionsOn")}: </Typography>
            <FormControl
              sx={{ m: 1, minWidth: 120, width: "40%" }}
              size="small"
            >
              <Select
                id="select-prop"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
              >
                <MenuItem value={0}>
                  {propNames[0]}, {measures[0]}
                </MenuItem>
                <MenuItem value={1}>
                  {propNames[1]}, {measures[1]}
                </MenuItem>
                <MenuItem value={2}>
                  {propNames[2]}, {measures[2]}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexDirection: "column",
            }}
          >
            <Typography variant="colorConfigText">
              {translate("CurrentValue")}
            </Typography>
            <Box
              sx={{
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#0C0F17",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: getBackgroundColor(),
                  height: "40px",
                  width: "40px",
                }}
              ></div>
              {newData.currentValue}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexDirection: "column",
            }}
          >
            <Typography variant="colorConfigText">
              {translate("SuggestedValue")}
            </Typography>
            <Box
              sx={{
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#0C0F17",
                paddingRight: "2px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F2C230",
                  height: "40px",
                  width: "40px",
                }}
              ></div>
              <p style={{ margin: 0 }}>{newData.suggestedValues[0]}</p>
              <Button
                sx={{
                  marginLeft: "auto",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#4C88FF",
                  borderRadius: "0px",
                  padding: "2px",
                }}
                onClick={() => setUserValue(newData.suggestedValues[0])}
              >
                Apply
              </Button>
            </Box>
            <Box
              sx={{
                borderRadius: "4px",
                padding: "4px",
                backgroundColor: "#0C0F17",
                display: "flex",
                paddingRight: "2px",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#5AC15A",
                  height: "40px",
                  width: "40px",
                }}
              ></div>
              <p style={{ margin: 0 }}>{newData.suggestedValues[1]}</p>
              <Button
                sx={{
                  marginLeft: "auto",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#4C88FF",
                  borderRadius: "0px",
                  padding: "2px",
                }}
                onClick={() => setUserValue(newData.suggestedValues[1])}
              >
                {translate("Apply")}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexDirection: "column",
            }}
          >
            <Typography variant="colorConfigText">
              {translate("YourValue")}, {measures[index]}
            </Typography>
            <Box
              sx={{
                borderRadius: "4px",
                padding: "4px",
                backgroundColor: "#0C0F17",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#BFC8CB",
                  height: "40px",
                  width: "46px",
                }}
              ></div>
              <input
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
                value={userValue}
                onChange={(e) => setUserValue(e.target.value)}
                min={0}
                max={150}
                type="number"
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <Button
            sx={{
              color: "white",
              border: "1px solid white",
              padding: "8px, 16px, 8px, 16px",
              borderRadius: "4px",
              width: "50%",
            }}
            onClick={() => setParameterAdjustmentOpened(false)}
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
              width: "50%",
            }}
            onClick={() => handleApply()}
          >
            <Typography variant="colorConfigButtonText">
              {translate("ApplyChanges")}
            </Typography>
          </Button>
        </Box>
      </Box>
      {/* </Fade> */}
    </Modal>
  );
}
