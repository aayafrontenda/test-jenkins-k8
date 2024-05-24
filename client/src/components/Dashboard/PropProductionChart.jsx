/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

am4core.addLicense("CH9578-2648-5177-6362");
am4core.useTheme(am4themes_animated);
export default function PropProductionChart({ colors, data, propName }) {
  const chartRef = useRef(null);
  console.log("chart data", data);

  useEffect(() => {
    /* Chart code */
    // Themes begin
    // Themes end

    // Create chart instance
    let chart = am4core.create(`chartdiv-${propName}`, am4charts.XYChart);

    // Remove scrollbar
    chart.scrollbarX = null;
    chart.scrollbarY = null;

    // Add data
    chart.data = data;

    const min = Math.min(...chart.data.map((item) => item[propName]));
    const max = Math.max(...chart.data.map((item) => item[propName]));

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dataFields.dateX = "date";
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    // dateAxis.tooltip.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = min;
    valueAxis.max = max;
    valueAxis.cursorTooltipEnabled = false;

    chart.xAxes.each((axis) => {
      axis.renderer.grid.template.disabled = true;
      axis.renderer.labels.template.disabled = true;
    });
    chart.yAxes.each((axis) => {
      axis.renderer.grid.template.disabled = true;
      axis.renderer.labels.template.disabled = true;
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = propName;
    series.dataFields.dateX = "date";
    series.tooltipText = "[{dateX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      if (target.dataItem.valueY >= 0) {
        return colors[0]; // Set positive values to color at index 0
      } else {
        return colors[1]; // Set negative values to color at index 1
      }
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div
      id={`chartdiv-${propName}`}
      style={{
        position: "absolute",
        width: "100%",
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: "-7%",
        top: "35%",
      }}
    >
      <Box sx={{ display: "flex" }}></Box>
    </div>
  );
}
