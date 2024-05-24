import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  OutlinedInput,
  Checkbox,
  Typography,
} from "@mui/material";
import FilterButton from "../shared-components/FilterButton";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/app-context";
import { formatMessage as translate } from "devextreme/localization";

const severityMessages = [
  { severity: "Warning", message: "PumpOff" },
  { severity: "Critical", message: "PumpFailed" },
  { severity: "Info", message: "SystemRestart" },
];

const generateMockData = (dateStart, dateEnd) => {
  let range = dateEnd - dateStart;
  let data = [];
  const getRandomValue = () => {
    const value = Math.floor(Math.random() * 3);
    return value;
  };

  for (let i = dateStart; i <= dateEnd; i += Math.floor(range / 7)) {
    const randomValue = getRandomValue();
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const formattedDate = new Date(i).toLocaleString("ru-RU", options);
    data.push({
      id: i,
      timestamp: formattedDate,
      severity: severityMessages[randomValue].severity,
      message: severityMessages[randomValue].message,
    });
  }
  if (data.length > 7) {
    return data.slice(1, data.length);
  }
  return data;
};

export default function Table() {
  const { currentRangeFlowmeters } = useContext(AppContext);
  const [allData, setAllData] = useState(
    generateMockData(currentRangeFlowmeters.middle, currentRangeFlowmeters.end)
  );
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setData(allData);
  }, [allData]);

  useEffect(() => {
    console.log("searchText", searchText);
    if (searchText !== "") {
      setData(
        allData.filter(
          (record) =>
            record.message.toLowerCase().includes(searchText.toLowerCase()) ||
            record.severity.toLowerCase().includes(searchText.toLowerCase()) ||
            record.timestamp.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      setData(allData);
    }
  }, [searchText, allData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "0px",
        marginTop: "-16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1, width: "50%" }}>
          <OutlinedInput
            id="event-logs-search-input"
            placeholder={translate("SearchEvents")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ color: "#898989", borderBottom: "none", height: "40px" }}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "#4C88FF" }} />
              </InputAdornment>
            }
          />
        </FormControl>
        <FilterButton displayLabel={false} />
      </div>
      <div style={{ height: "100%", width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", height: "100%", fontSize: "14px" }}>
          <thead style={{ color: "#A0A0A0" }}>
            <tr
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #596380",
                height: "60px",
              }}
            >
              <th
                style={{
                  width: "35%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {translate("Severity")}
              </th>
              <th style={{ width: "40%", textAlign: "left" }}>
                {translate("Timestamp")}
              </th>
              <th style={{ width: "25%", textAlign: "left" }}>
                {translate("EventMessage")}
              </th>
            </tr>
          </thead>
          <tbody style={{ color: "white" }}>
            {data.map((record, index) => (
              <tr
                key={record.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "16px 0px",
                  height: "30px",
                }}
              >
                <td style={{ width: "35%" }}>
                  {
                    <Typography
                      sx={{
                        color:
                          record.severity === "Warning"
                            ? "#E99C26"
                            : record.severity === "Critical"
                            ? "#DC2626"
                            : "#01B574",
                        fontWeight: "bold",
                        ml: "4px",
                      }}
                    >
                      {translate(record.severity)}
                    </Typography>
                  }
                </td>
                <td style={{ width: "40%", textAlign: "left" }}>
                  {record.timestamp}
                </td>
                <td style={{ width: "25%", textAlign: "left" }}>
                  {translate(record.message)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
