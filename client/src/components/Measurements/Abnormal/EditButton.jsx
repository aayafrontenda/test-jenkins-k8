import React, { useContext, useEffect } from "react";
import AppContext from "../../../context/app-context";
import EditIcon from "../../../images/EditIcon";

export default function EditButton({ index }) {
  const { setParameterAdjustmentOpened, setAbnormalSelectedIndex } =
    useContext(AppContext);
  return (
    <div
      id={`edit-button-${index}`}
      onClick={() => {
        setAbnormalSelectedIndex(index);
        /*
        setParameterAdjustmentOpened(true);
        console.log("modal toggle");
        */
      }}
    >
      <EditIcon fill={"white"} />
    </div>
  );
}
