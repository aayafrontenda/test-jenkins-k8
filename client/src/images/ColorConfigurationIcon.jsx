import React from "react";

export default function ColorConfigurationIcon({ fill }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "22px", minHeight: "22px" }}
    >
      <path
        d="M11 19.4722C12.0615 20.4223 13.4633 21 15 21C18.3137 21 21 18.3137 21 15C21 12.2331 19.1271 9.90359 16.5798 9.21017M5.42018 9.21016C2.87293 9.90358 1 12.2331 1 15C1 18.3137 3.68629 21 7 21C10.3137 21 13 18.3137 13 15C13 14.2195 12.851 13.4738 12.5798 12.7898M17 7C17 10.3137 14.3137 13 11 13C7.68629 13 5 10.3137 5 7C5 3.68629 7.68629 1 11 1C14.3137 1 17 3.68629 17 7Z"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
