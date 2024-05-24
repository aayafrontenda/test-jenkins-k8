import { Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import Table from "./Table";
import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import AppContext from "../../../context/app-context";
import dayjs from "dayjs";
import axios from "axios";
import { Actions } from "../../../context/APIState";

const getItems = (middle, end, pipeArr) => {
  let arr = [];
  const step = 3600 * 1000 * 1;
  for (let i = middle; i <= end; i += step) {
    if (i > dayjs().valueOf()) {
      break;
    }
    arr.push({
      id: `element-${i}`,
      date: dayjs(i).locale("Asia/Almaty").format("MMMM DD, YYYY, HH:mm"),
      pipeData: pipeArr.map((x) => {
        return {
          ...x,
          id: x.flowmeter.flowmeterId,
          name: x.flowmeter.name,
          liquid: x.measured.liquid,
          liquidTon: x.measured.liquidTon,
          oil: x.measured.oil,
          suggestedLiquid: x.suggested.liquid,
          suggestedLiquidTon: x.suggested.liquidTon,
          suggestedOil: x.suggested.oil,
        };
      }),
    });
  }
  if (arr.length > 7) {
    return arr.filter(
      (item, index) => index % Math.floor(arr.length / 7) === 0
    );
  }
  return arr;
};

function RecordsCards({ width, cardWidth, cardHeight, parent }) {
  const [items, setItems] = useState([]);
  const { currentRangeFlowmeters, jwtToken, hierarchy } =
    useContext(AppContext);

  const [pipes, setPipes] = useState([]);
  const [flatPipes, setFlatPipes] = useState([]);
  console.log("parent", parent);

  useEffect(() => {
    axios
      .get(
        `${Actions.GetFlowmetersLatestDataPoints}?PageNumber=1&PageSize=99&tagIds=018f3b2f-ae9c-4cad-935c-24c70a54aa78&tagIds=018f3b2f-c468-4013-8f9c-54c163bfc388&tagIds=018f3b2f-fbb6-418c-9a4a-da1570ec470d&tagIds=6d3a692a-d85c-4206-b797-f023a9061d8a`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        if (response && response.data) {
          setPipes(
            response.data.filter((pipe) => !pipe.flowmeter.name.includes("-"))
          );
          console.log(
            "new pipes",
            response.data.filter((pipe) => !pipe.flowmeter.name.includes("-"))
          );
        } else {
          setPipes([]);
        }
      });
  }, [jwtToken]);

  useEffect(() => {
    if (hierarchy && pipes.length > 0) {
      let pipesWithParents = hierarchy.subAssets.map((pun) =>
        pun.subAssets.map((gu) =>
          gu.subAssets.map((agzu) => {
            return {
              name: agzu.name,
              pipes: pipes
                .filter((pipe) => pipe.flowmeter.assetId === agzu.assetId)
                .map((pipe) => ({
                  ...pipe,
                  parent: agzu.name,
                  measured: {
                    liquid: parseInt(pipe.latestDataPoints[0].value),
                    liquidTon: parseInt(pipe.latestDataPoints[1].value),
                    oil: parseInt(pipe.latestDataPoints[2].value),
                  },
                  suggested: {
                    liquid: parseInt(pipe.latestDataPoints[3].value),
                    liquidTon:
                      parseInt(pipe.latestDataPoints[1].value) +
                      Math.floor(Math.random() * 5),
                    oil:
                      parseInt(pipe.latestDataPoints[2].value) +
                      Math.floor(Math.random() * 5),
                  },
                })),
            };
          })
        )
      );

      pipesWithParents = pipesWithParents.flat().flat();
      console.log("pipesWithParents", [
        ...pipesWithParents
          .map((row) =>
            row.pipes.map((pipe) => {
              return {
                ...pipe,
                id: pipe.flowmeter.flowmeterId,
                checked: false,
              };
            })
          )
          .flat(),
      ]);
      setFlatPipes([
        ...pipesWithParents
          .map((row) =>
            row.pipes.map((pipe) => {
              console.log(
                "pipe.flowmeter.flowmeterId",
                pipe.flowmeter.flowmeterId
              );
              return {
                ...pipe,
                id: pipe.flowmeter.flowmeterId,
              };
            })
          )
          .flat(),
      ]);
    }
  }, [hierarchy, pipes]);

  useEffect(() => {
    console.log("flatPipes", flatPipes);
    console.log(
      "flatPipes.filter((pipe) => pipe.parent === parent)",
      flatPipes.filter((pipe) => pipe.parent === parent)
    );
    if (flatPipes.length > 0) {
      setItems(
        getItems(
          currentRangeFlowmeters.middle,
          currentRangeFlowmeters.end,
          flatPipes.filter((pipe) => pipe.parent === parent)
        )
      );
    }
  }, [flatPipes, parent, currentRangeFlowmeters]);

  // React.useEffect(() => {
  //   setItems(
  //     getItems(currentRangeFlowmeters.middle, currentRangeFlowmeters.end)
  //   );
  // }, [currentRangeFlowmeters]);

  return (
    // <List
    //   itemCount={items.length}
    //   itemSize={cardWidth}
    //   height={cardHeight}
    <div
      className="List"
      // layout="horizontal"
      style={{
        display: "flex",
        // maxWidth: `calc(75% - ${sidebarWidth}px)`,
        gap: "16px",
        width: width,
        flexWrap: "no-wrap",
        overflowX: "scroll",
        scrollBehavior: "smooth",
        transition: "scroll 0.3s ease-in-out",
        height: "100%",
      }}
    >
      {items.map((item, index) => {
        return (
          <div
            style={{
              // ...style,
              minWidth: cardWidth - 16,

              height: "95%",
              borderRadius: "8px",
              backgroundImage: "none",
              backgroundColor: "#151B28",
              padding: "16px",
              // marginLeft: index > 0 ? "16px" : "0px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                height: "100%",
              }}
            >
              <Typography variant="h5">{items[index].date}</Typography>
              <Table rows={items[index].pipeData} />
            </Box>
          </div>
        );
      })}
    </div>
  );
}

export default RecordsCards;
