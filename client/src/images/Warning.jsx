import React from "react";

export default function Warning({ fill, stroke }) {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99985 6.00003V8.6667M7.99985 11.3334H8.00651M7.07673 2.59451L1.59347 12.0656C1.28933 12.5909 1.13726 12.8536 1.15974 13.0692C1.17934 13.2572 1.27786 13.4281 1.43076 13.5392C1.60607 13.6667 1.90957 13.6667 2.51659 13.6667H13.4831C14.0901 13.6667 14.3936 13.6667 14.5689 13.5392C14.7218 13.4281 14.8204 13.2572 14.84 13.0692C14.8624 12.8536 14.7104 12.5909 14.4062 12.0656L8.92297 2.59451C8.61992 2.07107 8.4684 1.80935 8.27071 1.72145C8.09828 1.64477 7.90142 1.64477 7.72898 1.72145C7.53129 1.80935 7.37977 2.07107 7.07673 2.59451Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
