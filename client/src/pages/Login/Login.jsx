import React, { useContext, useState } from "react";
import Logo from "../../images/Logo";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  darken,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/app-context";
import { formatMessage as translate } from "devextreme/localization";
import axios from "axios";
import { Actions } from "../../context/APIState";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthorized, setJwtToken, setExpiryDate, setRoute } =
    useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const handleApiCall = async () => {
    const url = Actions.Login;
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      });

      if (response && response.data) {
        navigate("/");
        const responsi = JSON.stringify(response.data, null, 2);
        const parsedJwt = parseJwt(responsi.slice(1, -1));

        setJwtToken(responsi.slice(1, -1));
        setExpiryDate(parsedJwt.exp * 1000);
        setAuthorized(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/");
    setRoute("/dashboard");
  };

  const handleLogin = (email, password) => {
    handleApiCall();
  };

  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          height: "max-content",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "8px",
          }}
        >
          <Logo color="white" />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "40px",
            borderRadius: "16px",
            backgroundColor: "#151B28",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "36px",
              color: "white",
            }}
          >
            {translate("SignIn")}
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontSize: "17px",
                fontWeight: 400,
                lineHeight: "23.15px",
                color: "#717171",
                margin: 0,
                padding: 0,
                marginTop: "24px",
                marginBottom: "8px",
              }}
            >
              {translate("EmailAddress")}:
            </p>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  width: "100%",
                  height: "46px",
                  padding: "4px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  "&:hover, &:focus": {
                    border: "1px solid #4C88FF",
                  },
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: "25.5px",
                }}
              />
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: "23.15px",
                  color: "#717171",
                  marginBottom: "8px",
                  margin: 0,
                  padding: 0,
                }}
              >
                {translate("Password")}:
              </p>
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: 500,
                  lineHeight: "25.5px",
                  margin: 0,
                  padding: 0,
                  color: "#4C88FF",
                  cursor: "pointer",
                  "&:hover": {
                    color: darken("#4C88FF", 0.2),
                  },
                }}
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                {translate("ForgotPassword")}
              </Typography>
            </div>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                sx={{
                  width: "100%",
                  height: "46px",
                  padding: "4px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  "&:hover, &:focus": {
                    border: "1px solid #4C88FF",
                  },
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: "25.5px",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                      edge="end"
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#4C88FF",
                          "&:hover": {
                            color: darken("#4C88FF", 0.2),
                          },
                          fontSize: "12px",
                          fontWeight: 400,
                          lineHeight: "18px",
                        }}
                      >
                        {showPassword ? translate("Hide") : translate("Show")}
                      </Typography>
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "16px",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setRememberMe((prev) => !prev)}
          >
            <Checkbox
              sx={{
                color: "#4C88FF !important",
                "&.Mui-checked": {
                  color: "#4C88FF !important",
                },
                marginLeft: "-8px",
              }}
              iconStyle={{ fill: "white" }}
              checked={rememberMe}
            />
            <p
              style={{
                fontSize: "17px",
                fontWeight: 400,
                lineHeight: "25.5px",
                color: "#B8B8B8",
              }}
            >
              {translate("RememberMe")}
            </p>
          </div>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                email.length > 0 && password.length > 0 ? "#4C88FF" : "#414141",
              width: "100%",
              height: "48px",
            }}
            onClick={() => {
              handleLogin(email, password);
            }}
          >
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: 500,
                lineHeight: "25.5px",
                color:
                  email.length > 0 && password.length > 0 ? "white" : "#898989",
              }}
            >
              {translate("SignIn")}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
