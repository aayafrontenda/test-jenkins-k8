import React, { useContext, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { formatMessage as translate } from "devextreme/localization";
import AppContext from "../../context/app-context";

const FullFeaturedCrudGrid = ({ eventLogs }) => {
  const [rows, setRows] = React.useState([...eventLogs]);

  React.useEffect(() => {
    console.log("rows", rows);
  }, [rows]);

  const getTextColor = (value) => {
    const bg = {
      success: "#15D28E",
      warning: "#E99C26",
      danger: "#DC2626",
    };
    // console.log("diff", diff);
    switch (value) {
      case severityMessages[0].severity:
        return bg.warning;
      case severityMessages[1].severity:
        return bg.danger;
      case severityMessages[2].severity:
        return bg.success;
      default:
        return bg.danger;
    }
  };

  const [columnWidth, setColumnWidth] = useState(150);
  const gridRef = useRef(null);

  const calculateTableWidth = () => {
    if (gridRef.current) {
      return gridRef.current.clientWidth / 3;
    }
    return 0;
  };

  useEffect(() => {
    if (!gridRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setColumnWidth(() => calculateTableWidth());
    });
    resizeObserver.observe(gridRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  const columns = [
    {
      field: "severity",
      headerName: `${translate("Severity")}`,
      width: Math.floor(columnWidth * 0.5),
      valueGetter: (params) => {
        return translate(params.row.severity);
      },
      renderCell: (params) => {
        return (
          <span
            style={{
              color: getTextColor(params.row.severity),
              fontWeight: "700",
            }}
          >
            {params.row.severity}
          </span>
        );
      },
    },
    {
      field: "timestamp",
      headerName: `${translate("Timestamp")}`,
      width: Math.floor(columnWidth * 1.3),
    },
    {
      field: "message",
      headerName: `${translate("EventMessage")}`,
      width: Math.floor(columnWidth),
      valueGetter: (params) => {
        return translate(params.row.message);
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "90%",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid rows={rows} columns={columns} id="events-grid" ref={gridRef} />
    </Box>
  );
};

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

export default function DataGridTable() {
  const { currentRangeFlowmeters } = useContext(AppContext);
  return (
    <Box
      sx={{
        height: "75vh",
        width: "100%",
        marginTop: "-12px",
      }}
    >
      <FullFeaturedCrudGrid
        eventLogs={generateMockData(
          currentRangeFlowmeters.middle,
          currentRangeFlowmeters.end
        )}
      />
    </Box>
  );
}
