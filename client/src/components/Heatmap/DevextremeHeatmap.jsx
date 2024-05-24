import React, { useContext } from "react";
import TreeMap, { Label, Tooltip } from "devextreme-react/tree-map";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/app-context";

const customizeTooltip = (arg) => {
  const { data } = arg.node;
  return {
    text: arg.node.isLeaf()
      ? `<span class="city">${data.name}</span><br/>Value: ${arg.valueText}`
      : null,
  };
};

const customizeLabel = (info) => {
  console.log("customize label", info);
  //   return info.node.isLeaf() ? `Value: ${data.value}` : data.name;
};

// Custom colorizer function considering both data and target value

export default function DevextremeHeatmap({
  data,
  targetData,
  parent,
  colors,
  handleHitFlowmeter,
}) {
  console.log("data", data);
  const navigate = useNavigate();
  const { setRoute } = useContext(AppContext);
  return (
    <TreeMap
      id="heatmap-treemap"
      dataSource={data}
      title={parent}
      labelField="displayName"
      colorizer={{ type: "none" }}
      style={{ height: "100%", color: "white !important" }}
      colorField="color"
      tile={{ border: { width: "2px", color: "#0C0F17" } }}
      hoverEnabled={false}
      onClick={(e) => {
        const flowmeterName = e.node.data.name;
        handleHitFlowmeter(flowmeterName);
        const url = `/measurements/selected/${flowmeterName}`;
        setRoute(url);
        navigate(url);
      }}
    >
      <Label visible={true} customizeText={customizeLabel} />
      <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
    </TreeMap>
  );
}
