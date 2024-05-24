import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  darken,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../../images/Logo";
import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CheckPass from "../../images/CheckPass";
import CheckFail from "../../images/CheckFail";
import { formatMessage as translate } from "devextreme/localization";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const [thirdCheck, setThirdCheck] = useState(false);

  useEffect(() => {
    setFirstCheck(newPassword.length >= 8);
    setSecondCheck(/[0-9]/.test(newPassword));
    setThirdCheck(/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword));
  }, [newPassword]);

  const handleReset = () => {
    if (
      firstCheck &&
      secondCheck &&
      thirdCheck &&
      newPassword === confirmPassword
    ) {
      navigate("/login");
    }
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
            {translate("ResetYourPassword")}
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
                marginTop: "8px",
                marginBottom: "8px",
              }}
            >
              {translate("ResetPasswordHint")}
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
              {translate("NewPassword")}:
            </p>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-password-confirm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type={showNewPassword ? "text" : "password"}
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
                placeholder={translate("EnterYourNewPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowNewPassword((prev) => !prev);
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
                        {showNewPassword
                          ? translate("Hide")
                          : translate("Show")}
                      </Typography>
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
            {newPassword.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                >
                  {firstCheck ? <CheckPass /> : <CheckFail />}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "19.07px",
                      color: firstCheck ? "#15D28E" : "#DC2626",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {translate("PasswordFirstCheck")}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  {secondCheck ? <CheckPass /> : <CheckFail />}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "19.07px",
                      color: secondCheck ? "#15D28E" : "#DC2626",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {translate("PasswordSecondCheck")}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  {thirdCheck ? <CheckPass /> : <CheckFail />}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "19.07px",
                      color: thirdCheck ? "#15D28E" : "#DC2626",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {translate("PasswordThirdCheck")}
                  </Typography>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 400,
                  lineHeight: "23.15px",
                  color: "#717171",
                  margin: 0,
                  padding: 0,
                  marginBottom: "8px",
                }}
              >
                {translate("ConfirmPassword")}:
              </p>
            </div>

            <FormControl>
              <OutlinedInput
                id="outlined-adornment-password-confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
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
                placeholder={translate("EnterYourConfirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowConfirmPassword((prev) => !prev);
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
                        {showConfirmPassword
                          ? translate("Hide")
                          : translate("Show")}
                      </Typography>
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
            {confirmPassword.length > 0 && confirmPassword !== newPassword && (
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <CheckFail />
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "19.07px",
                    color: "#DC2626",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {translate("PasswordsMatchError")}
                </Typography>
              </div>
            )}
          </div>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                firstCheck && secondCheck && thirdCheck ? "#4C88FF" : "#414141",
              width: "100%",
              height: "48px",
              marginTop: "16px",
            }}
            onClick={() => {
              handleReset();
            }}
          >
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: 500,
                lineHeight: "25.5px",
                color:
                  firstCheck && secondCheck && thirdCheck ? "white" : "#898989",
              }}
            >
              {translate("ResetPassword")}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
}
