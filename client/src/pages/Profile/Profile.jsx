import {
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../../context/app-context";
import { locale } from "devextreme/localization";
import { formatMessage as translate } from "devextreme/localization";

const inputStyles = {
  maxWidth: "490px",
  maxHeight: "56px",
  "& .MuiInputBase-input": {
    boxSizing: "border-box",
    width: "490px",
    height: "56px",
    fontSize: "16px",
    color: "var(--black20)",
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--grey89)",
    borderRadius: "8px",
  },
};

export default function Profile() {
  const { language, setLanguage, unit, setUnit } = useContext(AppContext);
  const [languageTemp, setLanguageTemp] = useState(language);
  const [unitTemp, setUnitTemp] = useState(unit);
  const navigate = useNavigate();

  const handleChange = () => {
    setLanguage(languageTemp);
    locale(languageTemp);
    setUnit(unitTemp);
    localStorage.setItem("language", languageTemp);
    localStorage.setItem("unit", unitTemp);
    navigate("/home");
  };

  const handleClose = () => {
    navigate("/home");
  };

  locale(language);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "32px",
        padding: "24px 40px",
        height: "100%",
        backgroundColor: "var(--black17)",
      }}
    >
      <div
        style={{
          borderRadius: "16px",
          padding: "40px",
          backgroundColor: "#151B28",
        }}
      >
        <div
          style={{
            marginBottom: "40px",
            fontSize: "18px",
            fontWeight: "700",
            color: "white",
          }}
        >
          {translate("myProfile")}
        </div>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: "0", fontSize: "17px", color: "var(--grey71)" }}>
            {translate("name")}
          </p>
          <TextField id="outlined-basic" variant="outlined" sx={inputStyles} />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: "0", fontSize: "17px", color: "var(--grey71)" }}>
            Email
          </p>
          <TextField id="outlined-basic" variant="outlined" sx={inputStyles} />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: "0", fontSize: "17px", color: "var(--grey71)" }}>
            {translate("NewPassword")}
          </p>
          <TextField id="outlined-basic" variant="outlined" sx={inputStyles} />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: "0", fontSize: "17px", color: "var(--grey71)" }}>
            {translate("ConfirmPassword")}
          </p>
          <TextField id="outlined-basic" variant="outlined" sx={inputStyles} />
        </label>
      </div>

      <div
        style={{
          borderRadius: "16px",
          padding: "40px",
          backgroundColor: "#151B28",
        }}
      >
        <div
          style={{
            marginBottom: "40px",
            fontSize: "18px",
            fontWeight: "700",
            color: "white",
          }}
        >
          Settings
        </div>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: "0", fontSize: "17px", color: "var(--grey71)" }}>
            {translate("selectLanguage")}
          </p>
          <FormControl
            sx={{
              maxWidth: "490px",
              ".MuiInputBase-root": {
                width: "490px",
                height: "56px",
                color: "white",
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderRadius: "8px",
                borderColor: "var(--grey89)",
              },
              ".MuiFormLabel-root": {
                color: "white",
              },
              ".MuiSvgIcon-root": {
                fill: "var(--black20)",
              },
            }}
            size="small"
          >
            <InputLabel id="demo-select-lang-label">
              {" "}
              {languageTemp}{" "}
            </InputLabel>
            <Select
              labelId="demo-select-lang-label"
              id="demo-select-lang"
              value={languageTemp}
              label={languageTemp}
              onChange={(event) => setLanguageTemp(event.target.value)}
            >
              <MenuItem value={"kz"}>
                <ListItemText primary={"Қазақша"} />{" "}
              </MenuItem>
              <MenuItem value={"ru"}>
                <ListItemText primary={"Русский"} />{" "}
              </MenuItem>
              <MenuItem value={"en"}>
                <ListItemText primary={"English"} />{" "}
              </MenuItem>
            </Select>
          </FormControl>
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          <p style={{ margin: "0", fontSize: "17px", color: "var(--grey71)" }}>
            {translate("unit")}
          </p>
          <FormControl
            sx={{
              maxWidth: "490px",
              ".MuiInputBase-root": {
                width: "490px",
                height: "56px",
                color: "white",
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderRadius: "8px",
                borderColor: "var(--grey89)",
              },
              ".MuiFormLabel-root": {
                color: "white",
              },
              ".MuiSvgIcon-root": {
                fill: "white",
              },
            }}
            size="small"
          >
            <InputLabel id="demo-select-unit-label"></InputLabel>
            <Select
              labelId="demo-select-unit-label"
              id="demo-select-unit"
              value={unitTemp}
              label={unitTemp}
              onChange={(event) => setUnitTemp(event.target.value)}
            >
              <MenuItem value={"metric"}>
                <ListItemText primary={translate("metric")} />{" "}
              </MenuItem>
              <MenuItem value={"american"}>
                <ListItemText primary={translate("american")} />{" "}
              </MenuItem>
            </Select>
          </FormControl>
        </label>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "26px",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "207px",
              minHeight: "58px",
              color: "white",
              borderColor: "white",
              fontWeight: "500",
              textTransform: "none",
              backgroundColor: "transparent",
            }}
            onClick={handleClose}
          >
            {translate("DiscardChanges")}
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "207px",
              minHeight: "58px",
              backgroundColor: "#4C88FF",
              fontWeight: "500",
              textTransform: "none",
              boxShadow: "none",
              color: "#fff",
              "&: hover": {
                backgroundColor: "rgba(37, 150, 190, 0.85)",
                boxShadow: "none",
              },
            }}
            onClick={handleChange}
          >
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
