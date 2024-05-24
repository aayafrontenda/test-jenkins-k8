/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect, useRef } from "react";
import { formatMessage as translate } from "devextreme/localization";

am4core.addLicense("CH9578-2648-5177-6362");
am4core.useTheme(am4themes_animated);
export default function TotalProductionChart({ data, colors }) {
  console.log("total data", data);
  const chartRef = useRef(null);

  useEffect(() => {
    /* Chart code */
    // Themes begin
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Remove scrollbar
    // chart.scrollbarX = null;
    // chart.scrollbarY = null;

    // Add data
    chart.data = data;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.disabled = true; // Set grid lines opacity
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.renderer.labels.template.fill = am4core.color("#596380");

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = am4core.color("#596380");
    valueAxis.renderer.grid.template.stroke = am4core.color("#E0E1E9"); // Set grid lines to white
    valueAxis.renderer.grid.template.strokeDasharray = "2,3"; // Set grid lines to dashed
    valueAxis.renderer.grid.template.strokeOpacity = 0.5; // Set grid lines opacity

    // Create series
    function createSeries(field, name, color) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.tooltipText = "{dateX}: [b]{valueY}[/]";
      series.strokeWidth = 2;

      if (color) {
        series.stroke = am4core.color(color);
      }

      // Add bullets (dots) on each data point
      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.fill = am4core.color(color);
      bullet.circle.stroke = am4core.color("#fff");
      bullet.circle.strokeWidth = 2;
      let gradient = new am4core.LinearGradient();
      gradient.rotation = 90;

      // Add two color stops, one with opacity and one transparent
      gradient.addColor(am4core.color(color), 0.8); // The color at full intended opacity
      gradient.addColor(am4core.color(color), 0.1); // The same color but fully transparent

      // Apply the gradient to the fill property of the series
      series.fill = gradient;
      series.tooltip.getFillFromObject = false; // This will make the tooltip use the fill of the series
      series.tooltip.background.fill = am4core.color(color); // Set tooltip background to solid white
      series.tooltip.background.fillOpacity = 1; // Set full opacity for the tooltip background

      // Apply the fill opacity
      series.fillOpacity = 0.6; // This will be the starting opacity at the top of the gradient

      return series;
    }

    createSeries(
      "liquid",
      `${translate("Liquid")}, ${translate("m^3")}`,
      colors[0]
    );
    createSeries(
      "liquidTon",
      `${translate("Liquid")}, ${translate("ton")}`,
      colors[1]
    );
    createSeries("oil", `${translate("Oil")}, ${translate("ton")}`, colors[2]);

    // chart.legend = new am4charts.Legend();
    // chart.legend.labels.template.fill = am4core.color("white");
    // chart.cursor = new am4charts.XYCursor();
    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.fill = am4core.color("#B8B8B8");
    chart.legend.labels.template.fillOpacity = 1;
    chart.legend.fillOpacity = 1;
    chart.legend.position = "bottom";
    chart.legend.marginBottom = 20;
    chart.legend.contentAlign = "right";
    chart.legend.fontSize = "14px";

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div
      id={`chartdiv`}
      style={{
        position: "absolute",
        width: "100%",
        height: "85%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "20%",
        left: "-1%",
      }}
    ></div>
  );
}
