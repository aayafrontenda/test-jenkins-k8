import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modal from "@mui/material/Modal";
import { TimeField } from "@mui/x-date-pickers";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Fade } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CalendarPicker from "./CalendarPicker";
import AppContext from "../../../context/app-context";
import { formatMessage as translate } from "devextreme/localization";
import { ruRU, kzKZ, enUS } from "@mui/x-date-pickers/locales";

const getStyle = (top, right, position) => {
  return {
    position: "absolute",
    bgcolor: "#151B28",
    color: "white",
    top: `calc(${top}px + 10px)`,
    right: position === "left" ? "auto" : 0,
    // right: right === "flowmetersRight" ? 0 : `calc(100% - ${right}px)`,
    left: position === "left" ? 0 : "auto",
    WebkitTransform: "none",
    transform: "none",
    borderRadius: "5px",
    minWidth: "330px",
    // boxShadow:
    //   "0px 11px 15px -7px rgba(0,0,0,0.7), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)",
    p: "8px",
    display: "flex",
    gap: "8px",
  };
};

export default function DateRangeSelectorModal({
  isDateRangeOpened,
  setIsDateRangeOpened,
  top,
  right,
  position = "left",
}) {
  const { currentRangeFlowmeters, setCurrentRangeFlowmeters, language } =
    useContext(AppContext);
  const [text, setText] = useState("");
  const [middle, setMiddle] = useState(dayjs());
  const [end, setEnd] = useState(dayjs());

  const [hmMiddle, setHmMiddle] = useState(dayjs());
  const [hmEnd, setHmEnd] = useState(dayjs());

  useEffect(() => {
    setText(currentRangeFlowmeters.text);
    setMiddle(dayjs(currentRangeFlowmeters.middle));
    setEnd(dayjs(currentRangeFlowmeters.end));
    setHmMiddle(dayjs(currentRangeFlowmeters.middle));
    setHmEnd(dayjs(currentRangeFlowmeters.end));
  }, [currentRangeFlowmeters]);

  const applyRange = () => {
    console.log("middle", middle);
    console.log("end", end);
    const hmMidDayjs = dayjs(hmMiddle);
    const hmEndDayjs = dayjs(hmEnd);
    console.log("hmMidDayjs", hmMidDayjs);
    console.log("hmEndDayjs", hmEndDayjs);
    const newObj = {
      text:
        text === "Custom"
          ? `${dayjs(middle).format("DD/MM/YYYY")} at ${hmMidDayjs
              .locale("ru")
              .format("HH:mm")} - ${dayjs(end).format(
              "DD/MM/YYYY"
            )} at ${hmEndDayjs.locale("ru").format("HH:mm")}`
          : text,
      middle: dayjs(middle)
        .hour(hmMidDayjs.get("hour"))
        .minute(hmMidDayjs.get("minute"))
        .valueOf(),
      end: dayjs(end)
        .hour(hmEndDayjs.get("hour"))
        .minute(hmEndDayjs.get("minute"))
        .valueOf(),
    };
    setCurrentRangeFlowmeters(newObj);
    localStorage.setItem("currentRangeFlowmeters", JSON.stringify(newObj));
    setIsDateRangeOpened(false);
  };

  const cancelRange = () => {
    setIsDateRangeOpened(false);
  };

  useEffect(() => {
    console.log("text", text);
  }, [text]);
  return (
    <Modal
      open={isDateRangeOpened}
      onClose={() => setIsDateRangeOpened(false)}
      aria-labelledby="modal-date-time-picker"
      sx={{
        ...getStyle(top, right, position),
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
        "& .MuiSvgIcon-root": {
          fill: "currentColor !important",
        },
      }}
    >
      <Fade in={isDateRangeOpened}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={
              language === "ru"
                ? ruRU.components.MuiLocalizationProvider.defaultProps
                    .localeText
                : language === "kz"
                ? kzKZ.components.MuiLocalizationProvider.defaultProps
                    .localeText
                : enUS.components.MuiLocalizationProvider.defaultProps
                    .localeText
            }
          >
            <CalendarPicker
              setText={setText}
              middle={middle}
              setMiddle={setMiddle}
              end={end}
              setEnd={setEnd}
            />
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                p: "8px",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", width: "15%" }}></div>
              <div
                style={{
                  width: "42.5%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TimeField
                  size="small"
                  // defaultValue={dayjs().set("minute", 0).set("second", 0)}
                  value={dayjs(hmMiddle)}
                  onChange={(value) => {
                    // console.log("value", value);
                    // console.log("middle", middle);
                    // console.log("newDate", newDate);
                    setHmMiddle((prev) => {
                      const newDate = dayjs(prev)
                        .hour(value.get("hour"))
                        .minute(value.get("minute"));
                      return newDate;
                    });
                  }}
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    outline: "none",
                  }}
                  format="HH:mm"
                />
              </div>
              <div
                style={{
                  width: "42.5%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TimeField
                  size="small"
                  // defaultValue={dayjs().set("minute", 0).set("second", 0)}
                  value={dayjs(hmEnd)}
                  onChange={(value) => {
                    // console.log("value", value);
                    // console.log("end", end);
                    // console.log("newDate", newDate);
                    setHmEnd((prev) => {
                      const newDate = dayjs(prev)
                        .hour(value.get("hour"))
                        .minute(value.get("minute"));

                      return newDate;
                    });
                  }}
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    outline: "none",
                  }}
                  format="HH:mm"
                />
              </div>
            </Box>
          </LocalizationProvider>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              p: "8px",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                width: "96px",
                height: "42px",
                padding: "4px 16px 4px 16px",
                borderRadius: "4px",
                color: "white",
                backgroundColor: "transparent",
                border: "1px solid white",
                fontSize: "13px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => cancelRange()}
            >
              {translate("Cancel")}
            </button>
            <button
              style={{
                width: "96px",
                height: "42px",
                padding: "4px 16px 4px 16px",
                borderRadius: "4px",
                color: "white",
                backgroundColor: "#4C88FF",
                border: "none",
                fontSize: "13px",
                fontWeight: 500,
                lineHeight: "24px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => applyRange()}
            >
              {translate("Apply")}
            </button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
