import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import Cell from "../../shared-components/Cell";
import AppContext from "../../../context/app-context";
import EditButton from "./EditButton";
import { formatMessage as translate } from "devextreme/localization";

const FlowmeterPipeTable = ({ flatPipes, setFlatPipes }) => {
  console.log("flatPipes from flowmeter", flatPipes);
  const checkAll = () => {
    setFlatPipes((prev) => [
      ...prev.map((pipe) => {
        return {
          ...pipe,
          checked: !pipe.checked,
        };
      }),
    ]);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "25%",
        borderRight: "1px dashed #596380",
        padding: "0px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "2px solid #596380",
          height: "45px",
        }}
      ></div>
      <table>
        <thead style={{ color: "#A0A0A0" }}>
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #596380",
              height: "60px",
              fontSize: "14px",
            }}
          >
            <th>
              <Checkbox onClick={() => checkAll()} size="small" />{" "}
              {translate("Flowmeter")}
            </th>
            <th>{translate("Pipe")}</th>
          </tr>
        </thead>
        <tbody style={{ color: "white", fontSize: "14px !important" }}>
          {flatPipes.map((pipe, index) => (
            <tr
              key={`${pipe.id}-flowmeter`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "8px 0px",
                height: "40px",
                borderBottom:
                  index !== flatPipes.length - 1 &&
                  "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <td>
                <Checkbox
                  size="small"
                  checked={pipe.checked}
                  onChange={() => {
                    setFlatPipes((prev) => [
                      ...prev.map((p, i) =>
                        i === index ? { ...p, checked: !p.checked } : p
                      ),
                    ]);
                  }}
                />
                {pipe.parent}
              </td>
              <td>{pipe.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MeasuredTable = ({ flatPipes }) => {
  console.log("flatPipes from measured", flatPipes);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "28%",
        borderRight: "1px dashed #596380",
        padding: "0px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "2px solid #596380",
          height: "45px",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "31.5px",
            letterSpacing: "0.02em",
            textAlign: "center",
            color: "white",
          }}
        >
          {translate("Measured")}
        </Typography>
      </div>
      <table>
        <thead style={{ color: "#A0A0A0" }}>
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #596380",
              height: "60px",
              padding: "0px 32px",
            }}
          >
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Oil")}</span>
                <span>({translate("ton")})</span>
              </div>
            </th>
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Liquid")}</span>
                <span>({translate("m^3")})</span>
              </div>
            </th>
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Liquid")}</span>
                <span>({translate("ton")})</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "white", fontSize: "14px !important" }}>
          {flatPipes.map((pipe, index) => (
            <tr
              key={`${pipe.id}-measured`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "8px 0px",
                padding: "0px 8px",
                height: "40px",
                borderBottom:
                  index !== flatPipes.length - 1 &&
                  "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].measured.oil}
                  suggestedValue={flatPipes[index].suggested.oil}
                  acceptableDeviation={"0 %"}
                />
              </td>
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].measured.liquid}
                  suggestedValue={flatPipes[index].suggested.liquid}
                  acceptableDeviation={"0 %"}
                />
              </td>
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].measured.liquidTon}
                  suggestedValue={flatPipes[index].suggested.liquidTon}
                  acceptableDeviation={"0 %"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SuggestedTable = ({ flatPipes }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "28%",
        borderRight: "1px dashed #596380",
        padding: "0px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "2px solid #596380",
          height: "45px",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "31.5px",
            letterSpacing: "0.02em",
            textAlign: "center",
            color: "white",
          }}
        >
          {translate("Suggested")}
        </Typography>
      </div>
      <table>
        <thead style={{ color: "#A0A0A0" }}>
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #596380",
              height: "60px",
              padding: "0px 32px",
            }}
          >
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Oil")}</span>
                <span>({translate("ton")})</span>
              </div>
            </th>
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Liquid")}</span>
                <span>({translate("m^3")})</span>
              </div>
            </th>
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Liquid")}</span>
                <span>({translate("ton")})</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "white", fontSize: "14px !important" }}>
          {flatPipes.map((pipe, index) => (
            <tr
              key={`${pipe.id}-suggested`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "8px 0px",
                padding: "0px 8px",
                height: "40px",
                borderBottom:
                  index !== flatPipes.length - 1 &&
                  "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].suggested.oil}
                  suggestedValue={flatPipes[index].suggested.oil}
                  acceptableDeviation={"0 %"}
                />
              </td>
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].suggested.liquid}
                  suggestedValue={flatPipes[index].suggested.liquid}
                  acceptableDeviation={"0 %"}
                />
              </td>
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].suggested.liquidTon}
                  suggestedValue={flatPipes[index].suggested.liquidTon}
                  acceptableDeviation={"0 %"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EditColumn = ({ flatPipes }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "115px",
        alignItems: "center",
        width: "9.5%",
        marginLeft: "-16px",
      }}
    >
      <EditButton index={1} />
      <EditButton index={2} />
      <EditButton index={3} />
      {/*flatPipes.map((pipe, index) => (
        <div
          key={`${pipe.id}-edit`}
          style={{
            height: "40px",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <EditButton index={index} />
        </div>
      ))*/}
    </div>
  );
};

const CorrectedTable = ({ flatPipes }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "28%",
        borderRight: "1px dashed #596380",
        padding: "0px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "2px solid #596380",
          height: "45px",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "31.5px",
            letterSpacing: "0.02em",
            textAlign: "center",
            color: "white",
          }}
        >
          {translate("Corrected")}
        </Typography>
      </div>
      <table>
        <thead style={{ color: "#A0A0A0" }}>
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #596380",
              height: "60px",
              padding: "0px 32px",
            }}
          >
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Oil")}</span>
                <span>({translate("ton")})</span>
              </div>
            </th>
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Liquid")}</span>
                <span>({translate("m^3")})</span>
              </div>
            </th>
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  fontSize: "14px",
                }}
              >
                <span>{translate("Liquid")}</span>
                <span>({translate("ton")})</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "white", fontSize: "14px !important" }}>
          {flatPipes.map((pipe, index) => (
            <tr
              key={`${pipe.id}-corrected`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "8px 0px",
                padding: "0px 8px",
                height: "40px",
                borderBottom:
                  index !== flatPipes.length - 1 &&
                  "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].corrected.oil}
                  suggestedValue={flatPipes[index].suggested.oil}
                  acceptableDeviation={"0 %"}
                />
              </td>
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].corrected.liquid}
                  suggestedValue={flatPipes[index].suggested.liquid}
                  acceptableDeviation={"0 %"}
                />
              </td>
              <td>
                <Cell
                  style={{ width: "90px", fontSize: "16px" }}
                  value={flatPipes[index].corrected.liquidTon}
                  suggestedValue={flatPipes[index].suggested.liquidTon}
                  acceptableDeviation={"0 %"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Table = memo(({ flatPipes, setFlatPipes }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "65vh",
        // backgroundColor: "#2B343A",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          overflowX: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          {/*
            <FlowmeterPipeTable
              flatPipes={flatPipes}
              setFlatPipes={setFlatPipes}
            />
            <MeasuredTable flatPipes={flatPipes} />
            <SuggestedTable flatPipes={flatPipes} />
            <CorrectedTable flatPipes={flatPipes} />
*/}
          {/* <EditColumn flatPipes={flatPipes} /> */}
        </div>
      </div>
    </Box>
  );
});

export default Table;
