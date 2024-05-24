import React, { useContext, useState } from "react";
import Logo from "../../images/Logo";
import {
  Button,
  FormControl,
  OutlinedInput,
  Typography,
  darken,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/app-context";
import { formatMessage as translate } from "devextreme/localization";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { setResetEmail } = useContext(AppContext);
  const navigate = useNavigate();
  const handleNext = (email) => {
    setResetEmail(email);
    navigate("/reset-password");
  };

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
          width: "32.5%",
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
            {translate("ForgotYourPassword")}
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
              {translate("ForgotPasswordHint")}
            </p>
          </div>
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
                  outline: "none",
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: "25.5px",
                }}
              />
            </FormControl>
          </div>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: email.length > 0 ? "#4C88FF" : "#414141",
              width: "100%",
              height: "48px",
              marginTop: "16px",
            }}
            onClick={() => {
              handleNext(email);
            }}
          >
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: 500,
                lineHeight: "25.5px",
                color: email.length > 0 ? "white" : "#898989",
              }}
            >
              {translate("Next")}
            </Typography>
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
            <div style={{ display: "flex", width: "100%", marginTop: "16px" }}>
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: 500,
                  lineHeight: "25.5px",
                  margin: 0,
                  padding: 0,
                  color: "#4C88FF",
                  cursor: "pointer",
                  mx: "auto",
                  "&:hover": {
                    color: darken("#4C88FF", 0.2),
                  },
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                {translate("BackToSignIn")}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
