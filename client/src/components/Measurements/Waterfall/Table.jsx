import Cell from "../../shared-components/Cell";
import { formatMessage as translate } from "devextreme/localization";

export default function Table({ rows }) {
  return (
    <div style={{ height: "100%", width: "100%", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "21px",
              color: "#C0C0C0",
              letterSpacing: "0em",
              textAlign: "left",
              margin: "4px 0px",
              height: "40px",
            }}
          >
            <th style={{ width: "60px", textAlign: "left" }}>
              {translate("Pipe")}
            </th>
            <th style={{ width: "90px", textAlign: "center" }}>
              {translate("Liquid")}, {translate("m^3")}
            </th>
            <th style={{ width: "90px", textAlign: "center" }}>
              {translate("Liquid")}, {translate("ton")}
            </th>
            <th style={{ width: "80px", textAlign: "center" }}>
              {translate("Oil")}, {translate("ton")}
            </th>
          </tr>
        </thead>
        <tbody style={{ color: "black", fontSize: "14px" }}>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              style={{
                borderBottom: index !== rows.length - 1 && "1px solid #B0B0B0",
                margin: "4px 0px",
                height: "40px",
              }}
            >
              <td style={{ color: "white", width: "60px" }}>{row.name}</td>
              <td style={{ textAlign: "right", width: "90px" }}>
                <Cell
                  value={row.liquid}
                  suggestedValue={row.suggestedLiquid}
                  propName={"liquid"}
                />
              </td>
              <td style={{ textAlign: "right", width: "90px" }}>
                <Cell
                  style={{ backgroundColor: "transparent" }}
                  value={row.liquidTon}
                  suggestedValue={row.suggestedLiquidTon}
                  propName={"liquidTon"}
                />
              </td>
              <td style={{ textAlign: "right", width: "80px" }}>
                <Cell
                  style={{ backgroundColor: "transparent" }}
                  value={row.oil}
                  suggestedValue={row.suggestedOil}
                  propName={"oilTon"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
