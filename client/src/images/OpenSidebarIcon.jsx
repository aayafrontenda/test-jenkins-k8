import React from "react";

export default function OpenSidebarIcon({ onClick = () => {}, style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="22"
      height="22"
      viewBox="0 0 1000 1000"
      onClick={onClick}
      style={{ ...style }}
    >
      <desc>Created with Fabric.js 3.5.0</desc>
      <defs></defs>
      <rect x="0" y="0" width="100%" height="100%" fill="none" />
      <g transform="matrix(-41.3223 0 0 41.3223 499.9998 499.9998)" id="267135">
        <g style={{}} vector-effect="non-scaling-stroke">
          <g transform="matrix(1 0 0 1 0 0)">
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(255,255,255)",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform=" translate(-11, -11)"
              d="M 11 21 C 16.5228 21 21 16.5228 21 11 C 21 5.47715 16.5228 1 11 1 C 5.47715 1 1 5.47715 1 11 C 1 16.5228 5.47715 21 11 21 Z"
              stroke-linecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 -2 0)">
            <path
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "rgb(255,255,255)",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform=" translate(-9, -11)"
              d="M 11 7 L 7 11 L 11 15"
              stroke-linecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 0)">
            <path
              style={{
                stroke: "rgb(0,0,0)",
                strokeWidth: 2,
                strokeDasharray: "none",
                strokeLinecap: "round",
                strokeDashoffset: 0,
                strokeLinejoin: "round",
                strokeMiterlimit: 4,
                isCustomFont: "none",
                fontFileUrl: "none",
                fill: "none",
                fillRule: "nonzero",
                opacity: 1,
              }}
              transform=" translate(-11, -11)"
              d="M 11 7 L 7 11 M 7 11 L 11 15 M 7 11 H 15 M 21 11 C 21 16.5228 16.5228 21 11 21 C 5.47715 21 1 16.5228 1 11 C 1 5.47715 5.47715 1 11 1 C 16.5228 1 21 5.47715 21 11 Z"
              stroke-linecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
