/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/app-context";

am4core.addLicense("CH9578-2648-5177-6362");
am4core.useTheme(am4themes_animated);
export default function TreemapChart({
  data,
  colors,
  punName,
  handleHitFlowmeter,
  targetData = {},
}) {
  const { heatmapColorConfigRanges, setRoute } = useContext(AppContext);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  useEffect(() => {
    // Create chart instance
    var chart = am4core.create(`treemap-${punName}`, am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    function processData(data) {
      var treeData = [];
      console.log("chart data", data);
      for (var pun in data) {
        const punData = { name: pun, children: [] };
        console.log("chart pun", pun);
        for (var gu in data[pun]) {
          console.log("chart gu", gu);
          var guData = {
            name: `${pun} ${gu}`,
            children: [],
          };
          console.log("chart data[pun][gu]", data[pun][gu]);
          for (var agzu in data[pun][gu]) {
            console.log("chart agzu", agzu);
            guData.children.push({
              name: agzu,
              count: data[pun][gu][agzu],
              shortName: agzu,
            });
          }
          punData.children.push(guData);
        }
        treeData.push(punData);
      }
      console.log("tree data", treeData);
      return treeData;
    }

    chart.maxLevels = 3;
    // define data fields
    chart.dataFields.value = "count";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    chart.homeText = punName;

    // enable navigation
    chart.navigationBar = new am4charts.NavigationBar();
    chart.navigationBar.links.template.fill = am4core.color("white");
    chart.navigationBar.activeLink.fill = am4core.color("white");

    // level 0 series template
    var level0SeriesTemplate = chart.seriesTemplates.create("0");
    level0SeriesTemplate.strokeWidth = 2;
    level0SeriesTemplate.stroke = am4core.color("white");

    // create hover state
    var bullet0 = level0SeriesTemplate.bullets.push(
      new am4charts.LabelBullet()
    );
    bullet0.locationY = 0.5;
    bullet0.locationX = 0.5;
    bullet0.label.text = "{value}";
    bullet0.label.fontWeight = "600";
    bullet0.label.fill = am4core.color("black");
    var columnTemplate0 = level0SeriesTemplate.columns.template;
    var hoverState = columnTemplate0.states.create("hover");
    columnTemplate0.tooltipText = "{name}: {count}";

    // darken
    hoverState.adapter.add("fill", function (fill, target) {
      if (fill instanceof am4core.Color) {
        return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
      }
      return fill;
    });

    // level1 series template
    var level1SeriesTemplate = chart.seriesTemplates.create("1");
    level1SeriesTemplate.stroke = am4core.color("transparent");
    level1SeriesTemplate.strokeWidth = 2;
    var bullet1 = level1SeriesTemplate.bullets.push(
      new am4charts.LabelBullet()
    );
    var columnTemplate1 = level1SeriesTemplate.columns.template;
    columnTemplate1.tooltipText = "{name}: {count}";
    bullet1.locationY = 0.5;
    bullet1.locationX = 0.5;
    bullet1.label.text = "{count}";
    bullet1.label.fontWeight = "600";
    bullet1.label.fill = am4core.color("white");

    // level2 series template
    var level2SeriesTemplate = chart.seriesTemplates.create("2");
    level2SeriesTemplate.columns.template.events.on(
      "validated",
      function (event) {
        var column = event.target;
        var value = column.dataItem.value;
        console.log("level 1 value", value);
        const flowmeterName = column.dataItem.dataContext.name;
        const diff = Math.floor(
          (Math.abs(value - targetData[flowmeterName]) /
            targetData[flowmeterName]) *
            100
        );
        console.log("level 1 diff", diff);
        if (diff < heatmapColorConfigRanges.agzuFlowRate[0]) {
          column.fill = am4core.color(colors[0]);
        } else if (
          diff >= heatmapColorConfigRanges.agzuFlowRate[0] &&
          diff < heatmapColorConfigRanges.agzuFlowRate[1]
        ) {
          column.fill = am4core.color(colors[1]);
        } else {
          column.fill = am4core.color(colors[2]);
        }
        column.column.cornerRadius(4, 4, 4, 4);
      }
    );

    level2SeriesTemplate.columns.template.events.on("hit", function (event) {
      const flowmeterName = event.target.dataItem.dataContext.name;
      handleHitFlowmeter(flowmeterName);
      const url = `/measurements/selected/${flowmeterName}`;
      setRoute(url);
      navigate(url);
    });

    var bullet2 = level2SeriesTemplate.bullets.push(
      new am4charts.LabelBullet()
    );
    bullet2.locationX = 0.5;
    bullet2.locationY = 0.5;
    bullet2.label.text = "{count}";
    bullet2.label.fill = am4core.color("#ffffff");

    chart.data = processData(data);
    chart.height = am4core.percent(100);

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data, colors, punName]);

  return (
    <div
      id={`treemap-${punName}`}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "-2.5%",
        left: "-0.5%",
        color: "white !important",
      }}
    ></div>
  );
}
