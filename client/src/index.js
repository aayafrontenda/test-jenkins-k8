import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LicenseInfo } from "@mui/x-license-pro";

import { loadMessages, locale } from "devextreme/localization";
import ruMessages from "./locales/ru.json";
import kzMessages from "./locales/kz.json";
import enMessages from "./locales/en.json";

loadMessages({
  ru: ruMessages,
  kz: kzMessages,
  en: enMessages,
});

// Set your MUI Pro license key here
LicenseInfo.setLicenseKey(
  "3fadc94d3c714f26458b5081b0b038dcTz03MjI2NCxFPTE3MjI5NTU5MTMwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  /* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
