import * as React from "react";
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
import AppContext from "../../../context/app-context";

const getTextColor = (value, suggestedValue, acceptableDeviation) => {
  const bg = {
    success: "#15D28E",
    warning: "#E99C26",
    danger: "#DC2626",
  };
  const diff = (value - suggestedValue) / suggestedValue;
  // console.log("diff", diff);
  switch (acceptableDeviation) {
    case "- 10 %":
      return diff < -0.1 || diff > 0
        ? bg.danger
        : diff === 0
        ? bg.success
        : bg.warning;
    case "- 5 %":
      return diff < -0.05 || diff > 0
        ? bg.danger
        : diff === 0
        ? bg.success
        : bg.warning;
    case "0 %":
      return diff !== 0 ? bg.danger : bg.success;
    case "5 %":
      return diff > 0.05 || diff < 0
        ? bg.danger
        : diff === 0
        ? bg.success
        : bg.warning;
    case "10 %":
      return diff > 0.1 || diff < 0
        ? bg.danger
        : diff === 0
        ? bg.success
        : bg.warning;
    default:
      return bg.danger;
  }
};

const FullFeaturedCrudGrid = ({ flatPipes }) => {
  console.log("flatPipes from DataGrid", flatPipes);
  const { setParameterAdjustmentOpened, acceptableDeviation } =
    React.useContext(AppContext);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setRows([...flatPipes]);
  }, [flatPipes]);

  React.useEffect(() => {
    console.log("rows", rows);
  }, [rows]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "parent.name",
      align: "center",
      headerAlign: "center",
      headerName: "Flowmeter",
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.parent.name;
      },
    },
    {
      field: "name",
      headerName: "Pipe",
      align: "center",
      headerAlign: "center",
      width: 80,
      editable: true,
      valueGetter: (params) => {
        return params.row.flowmeter.name;
      },
    },
    {
      field: "measured.oil",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Oil")} (${translate("ton")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.measured.oil;
      },
      renderCell: (params) => {
        return (
          <span
            style={{
              fontWeight: "700",
              color: getTextColor(
                params.row.measured.oil,
                params.row.suggested.oil,
                acceptableDeviation
              ),
            }}
          >
            {params.row.measured.oil}
          </span>
        );
      },
    },
    {
      field: "measured.liquid",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Liquid")} (${translate("m^3")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.measured.liquid;
      },
      renderCell: (params) => {
        return (
          <span
            style={{
              fontWeight: "700",
              color: getTextColor(
                params.row.measured.liquid,
                params.row.suggested.liquid,
                acceptableDeviation
              ),
            }}
          >
            {params.row.measured.liquid}
          </span>
        );
      },
    },
    {
      field: "measured.liquidTon",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Liquid")} (${translate("ton")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.measured.liquidTon;
      },
      renderCell: (params) => {
        return (
          <span
            style={{
              fontWeight: "700",
              color: getTextColor(
                params.row.measured.liquidTon,
                params.row.suggested.liquidTon,
                acceptableDeviation
              ),
            }}
          >
            {params.row.measured.liquidTon}
          </span>
        );
      },
    },
    {
      field: "suggested.oil",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Oil")} (${translate("ton")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.suggested.oil;
      },
    },
    {
      field: "suggested.liquid",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Liquid")} (${translate("m^3")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.suggested.liquid;
      },
    },
    {
      field: "suggested.liquidTon",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Liquid")} (${translate("ton")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.suggested.liquidTon;
      },
    },
    {
      field: "corrected.oil",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Oil")} (${translate("ton")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.corrected.oil;
      },
    },
    {
      field: "corrected.liquid",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Liquid")} (${translate("m^3")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.corrected.liquid;
      },
    },
    {
      field: "corrected.liquidTon",
      align: "center",
      headerAlign: "center",
      headerName: `${translate("Liquid")} (${translate("ton")})`,
      width: 130,
      editable: true,
      valueGetter: (params) => {
        return params.row.corrected.liquidTon;
      },
    },
    {
      field: "actions",
      type: "actions",
      align: "center",
      headerName: "Actions",
      width: 90,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        sx={{
          "& .MuiDataGrid-cell[data-colindex='1'], .MuiDataGrid-cell[data-colindex='4'], .MuiDataGrid-cell[data-colindex='8'], .MuiDataGrid-cell[data-colindex='10']":
            {
              borderRight: "1px solid rgba(255, 255, 255, 0.2)",
            },
          "& .MuiDataGrid-columnHeader[aria-colindex='2'], .MuiDataGrid-columnHeader[aria-colindex='5'], .MuiDataGrid-columnHeader[aria-colindex='9'], .MuiDataGrid-columnHeader[aria-colindex='11']":
            {
              borderRight: "1px solid rgba(255, 255, 255, 0.2)",
            },
        }}
      />
    </Box>
  );
};

export default function DataGridTable({ flatPipes }) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        marginTop: "16px",
      }}
    >
      <FullFeaturedCrudGrid flatPipes={flatPipes} />
    </Box>
  );
}
