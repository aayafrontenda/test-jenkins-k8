import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import dayjs from "dayjs";
import AppContext from "../../../context/app-context";
import Calendar from "../../../images/Calendar";
import DateRangeSelectorModal from "./DateRangeSelector";
import { formatMessage as translate } from "devextreme/localization";

const intervals = [
  { fullName: "Last 12 Hours", shortName: "12 h" },
  { fullName: "Today", shortName: "1 d" },
  { fullName: "This Week", shortName: "1 w" },
  { fullName: "This Month", shortName: "1 m" },
  { fullName: "Last 3 Months", shortName: "3 m" },
  { fullName: "This Year", shortName: "1 y" },
];

const Tabs = ({ handleRangeChange }) => {
  return (
    <Box
      sx={{
        marginLeft: "auto",
        display: "flex",
        gap: "8px",
        color: "white",
        alignItems: "center",
        "&>button": {
          cursor: "pointer",
          backgroundColor: "transparent",
          color: "white",
          minWidth: "auto",
          outline: "none",
          border: "none",
          position: "relative",
        },
      }}
    >
      {intervals.map((interval) => (
        <Button
          key={interval.fullName}
          onClick={(e) => handleRangeChange(interval.fullName)}
        >
          <Typography variant="subTabButtonText">
            {interval.shortName}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default function MainDatePicker({
  tabsDisplayed,
  pickerDisplayed,
  style = {},
  position = "right",
  labelPosition = "top",
  tabsPosition = "left",
}) {
  const { currentRangeFlowmeters, setCurrentRangeFlowmeters } =
    useContext(AppContext);

  const [isDateRangeOpened, setIsDateRangeOpened] = useState(false);
  const [range, setRange] = useState("");

  useEffect(() => {
    console.log("currentRangeFlowmeters", currentRangeFlowmeters);
    if (currentRangeFlowmeters.text === "") {
      setRange(
        `${dayjs(currentRangeFlowmeters.middle).format("DD/MM/YYYY")} - ${dayjs(
          currentRangeFlowmeters.end
        ).format("DD/MM/YYYY")}`
      );
    } else {
      setRange(currentRangeFlowmeters.text);
    }
  }, [currentRangeFlowmeters]);

  const handleRangeChange = (value) => {
    setRange(value);
    switch (value) {
      case "Last 12 Hours": {
        console.log({
          text: value,
          middle: dayjs().subtract(12, "hour").valueOf(),
          end: dayjs().valueOf(),
        });
        setCurrentRangeFlowmeters({
          text: value,
          middle: dayjs().subtract(12, "hour").valueOf(),
          end: dayjs().valueOf(),
        });
        break;
      }
      case "Today": {
        setCurrentRangeFlowmeters({
          text: value,
          middle: dayjs().startOf("day").valueOf(),
          end: dayjs().endOf("day").valueOf(),
        });
        break;
      }
      case "This Week": {
        setCurrentRangeFlowmeters({
          text: value,
          middle: dayjs().startOf("week").valueOf(),
          end: dayjs().endOf("week").valueOf(),
        });
        break;
      }
      case "This Month": {
        setCurrentRangeFlowmeters({
          text: value,
          middle: dayjs().startOf("month").valueOf(),
          end: dayjs().endOf("month").valueOf(),
        });
        break;
      }
      case "Last 3 Months": {
        setCurrentRangeFlowmeters({
          text: value,
          middle: dayjs().subtract(3, "month").valueOf(),
          end: dayjs().valueOf(),
        });
        break;
      }
      case "This Year": {
        setCurrentRangeFlowmeters({
          text: value,
          middle: dayjs().startOf("year").valueOf(),
          end: dayjs().endOf("year").valueOf(),
        });
        break;
      }
      default: {
        return;
      }
    }
  };

  function getTop() {
    const dateRangeButton = document.getElementById(
      "dateRangeSelectorButtonSurface"
    );
    let top = 0;
    if (dateRangeButton) {
      const buttonRect = dateRangeButton.getBoundingClientRect();
      top = buttonRect.top + buttonRect.height;
    }
    return top;
  }

  return (
    <Box
      sx={{
        marginLeft: "auto",
        display: "flex",
        gap: "16px",
        color: "white",
        alignItems: "center",
        marginRight: "24px",
        ...style,
      }}
    >
      {tabsDisplayed && tabsPosition === "left" && (
        <Tabs handleRangeChange={handleRangeChange} />
      )}
      {pickerDisplayed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: labelPosition === "top" ? "column" : "row",
            gap: "4px",
            alignItems: labelPosition === "left" && "center",
          }}
        >
          <Typography sx={{ marginRight: "8px", fontSize: "16px" }}>
            {translate("FilterByDate")}:{" "}
          </Typography>
          <IconButton
            aria-label="calendar"
            onClick={() => setIsDateRangeOpened((prev) => !prev)}
            style={{
              display: "flex",
              width: "max-content",
              height: "42px",
              padding: "8px",
              // width: "25%",
              alignItems: "center",
              gap: "12px",
              borderRadius: "4px",
              border: "1px solid #6C6C6C",
              background: "transparent",
            }}
            id="dateRangeSelectorButtonSurface"
          >
            <span
              style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "150%",
                color: "white",
              }}
              className="currentRangeSpan"
            >
              {range}
            </span>
            <Calendar fill="#FFFFFF" />
          </IconButton>

          <DateRangeSelectorModal
            isDateRangeOpened={isDateRangeOpened}
            setIsDateRangeOpened={setIsDateRangeOpened}
            top={getTop()}
            right={"flowmetersRight"}
            position={position}
          />
        </Box>
      )}
      {tabsDisplayed && tabsPosition === "right" && (
        <Tabs handleRangeChange={handleRangeChange} />
      )}
    </Box>
  );
}
