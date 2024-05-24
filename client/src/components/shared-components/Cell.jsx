import React, { useContext, useState } from "react";
import HandIcon from "../../images/HandIcon";
import AppContext from "../../context/app-context";

const getColor = (value, suggestedValue, bounds) => {
  const bg = {
    success: "#15D28E",
    warning: "#E99C26",
    danger: "#DC2626",
  };
  const diff = Math.floor(
    (Math.abs(value - suggestedValue) / suggestedValue) * 100
  );

  if (diff < bounds[0]) {
    return bg.success;
  } else if (diff < bounds[1]) {
    return bg.warning;
  } else {
    return bg.danger;
  }
};

export default function Cell({ value, suggestedValue, style = {}, propName }) {
  const { colorConfigRanges } = useContext(AppContext);
  const [displayHand, setDisplayHand] = useState(false);
  return (
    <div
      onMouseEnter={(e) => {
        setDisplayHand(true);
      }}
      onMouseLeave={(e) => {
        setDisplayHand(false);
      }}
      style={{
        padding: "4px",
        width: "60px",
        height: "35px",
        // color: "white",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "700",
        borderRadius: "4px",
        fontSize: "16px",
        margin: "2px auto",
        backgroundColor: "transparent",
        color: getColor(value, suggestedValue, colorConfigRanges[propName]),
        ...style,
      }}
    >
      {value}
    </div>
  );
}
