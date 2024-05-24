/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect, useRef } from "react";
import { formatMessage as translate } from "devextreme/localization";

am4core.addLicense("CH9578-2648-5177-6362");
am4core.useTheme(am4themes_animated);
export default function WellStockChart({ data, colors }) {
  const chartRef = useRef(null);

  useEffect(() => {
    /* Chart code */
    // Themes begin
    // Themes end

    // Create chart instance
    var chart = am4core.create("well-stock", am4charts.XYChart);

    // Remove scrollbar
    // chart.scrollbarX = null;
    // chart.scrollbarY = null;

    // Add data
    chart.data = data;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.dataFields.dateX = "date";
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.disabled = true; // Set grid lines opacity
    dateAxis.renderer.labels.template.fill = am4core.color("white");

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.inside = true;
    // valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.renderer.labels.template.fill = am4core.color("white");
    valueAxis.renderer.grid.template.stroke = am4core.color("#E0E1E9"); // Set grid lines to white
    valueAxis.renderer.grid.template.strokeOpacity = 0.5; // Set grid lines opacity
    // "#E0E1E9";

    // Create series
    function createSeries(field, name, color) {
      // Set up series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.fill = am4core.color(color);
      series.dataFields.dateX = "date";
      series.sequencedInterpolation = true;
      series.columns.template.strokeWidth = 0;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText =
        "[bold]{name}[/]\n[font-size:14px]{dateX}: {valueY}";

      // Add label
      //   var labelBullet = series.bullets.push(new am4charts.LabelBullet());
      //   labelBullet.label.text = "{valueY}";
      //   labelBullet.locationY = 0.5;
      //   labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries("online", translate("Online"), colors[0]);
    createSeries("off", translate("Off"), colors[1]);
    createSeries("stopped", translate("Stopped"), colors[2]);

    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.fill = am4core.color("white");
    chart.legend.position = "bottom";
    chart.legend.marginBottom = 20;
    chart.legend.fontSize = "14px";
    chart.legend.contentAlign = "right";
    // chart.legend.outlineColor = am4core.color("#2B343A"); // Set outline color to transparent
    // chart.legend.outlineOpacity = 0; // Set outline opacity to 0
    // chart.legend.valign = "top";

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div
      id={`well-stock`}
      style={{
        position: "absolute",
        width: "97.5%",
        height: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "10%",
        left: "0.25%",
      }}
    ></div>
  );
}
