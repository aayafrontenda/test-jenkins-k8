import { useCallback, useState } from "react";
import AppContext from "./app-context";

function AppState({ children }) {
  const [currentRangeFlowmeters, setCurrentRangeFlowmeters] = useState(() => {
    if (localStorage.getItem("currentRangeFlowmeters")) {
      return JSON.parse(localStorage.getItem("currentRangeFlowmeters"));
    } else {
      return {
        text: "",
        middle: Date.now() - 3 * 24 * 60 * 60 * 1000,
        end: Date.now(),
      };
    }
  });

  const [colorConfigRanges, setColorConfigRanges] = useState(() => {
    if (localStorage.getItem("colorConfigRanges")) {
      return JSON.parse(localStorage.getItem("colorConfigRanges"));
    } else {
      return {
        liquid: [25, 75],
        liquidTon: [25, 75],
        oilTon: [25, 75],
      };
    }
  });

  const [heatmapColorConfigRanges, setHeatmapColorConfigRanges] = useState(
    () => {
      if (localStorage.getItem("heatmapColorConfigRanges")) {
        return JSON.parse(localStorage.getItem("heatmapColorConfigRanges"));
      } else {
        return {
          guFlowRate: [25, 75],
          agzuFlowRate: [25, 75],
        };
      }
    }
  );

  const [abnormalSelectedIndex, setAbnormalSelectedIndex] = useState(2);
  const [acceptableDeviation, setAcceptableDeviationState] = useState(() => {
    if (localStorage.getItem("acceptableDeviation")) {
      return localStorage.getItem("acceptableDeviation");
    } else {
      return "0 %";
    }
  });

  const setAcceptableDeviation = (value) => {
    setAcceptableDeviationState(value);
    localStorage.setItem("acceptableDeviation", value);
  };

  const [selectedFlowmeterData, setSelectedFlowmeterData] = useState(() => {
    if (localStorage.getItem("selectedFlowmeterData")) {
      return JSON.parse(localStorage.getItem("selectedFlowmeterData"));
    } else {
      return {
        id: "",
        name: "",
        data: [],
      };
    }
  });

  const [authorized, setAuthorizedState] = useState(() => {
    if (localStorage.getItem("authorized")) {
      return JSON.parse(localStorage.getItem("authorized"));
    } else {
      return false;
    }
  });

  const setAuthorized = (value) => {
    setAuthorizedState(value);
    localStorage.setItem("authorized", value);
  };

  const [resetEmail, setResetEmail] = useState("");

  const [route, setRouteState] = useState(() => {
    if (localStorage.getItem("route")) {
      return JSON.parse(localStorage.getItem("route"));
    } else {
      return "";
    }
  });

  const setRoute = (value) => {
    setRouteState(value);
    localStorage.setItem("route", JSON.stringify(value));
  };

  const [language, setLanguageState] = useState(() => {
    if (localStorage.getItem("language")) {
      return localStorage.getItem("language");
    } else {
      return "en";
    }
  });

  const setLanguage = (value) => {
    setLanguageState(value);
    localStorage.setItem("language", value);
  };

  const [hierarchy, setHierarchyState] = useState(() => {
    if (localStorage.getItem("hierarchy")) {
      return JSON.parse(localStorage.getItem("hierarchy"));
    } else {
      return [];
    }
  });

  const setHierarchy = (value) => {
    setHierarchyState(value);
    localStorage.setItem("hierarchy", JSON.stringify(value));
  };

  const [parameterAdjustmentOpened, setParameterAdjustmentOpened] =
    useState(false);

  const [flatPipes, setFlatPipesState] = useState(() => {
    if (localStorage.getItem("flatPipes")) {
      return JSON.parse(localStorage.getItem("flatPipes"));
    } else {
      return [];
    }
  });

  const setFlatPipes = (value) => {
    setFlatPipesState(value);
    localStorage.setItem("flatPipes", JSON.stringify(value));
  };

  const [jwtToken, setJwtTokenState] = useState(() => {
    if (localStorage.getItem("jwtToken")) {
      return JSON.parse(localStorage.getItem("jwtToken"));
    } else {
      return "";
    }
  });

  const setJwtToken = (value) => {
    setJwtTokenState(value);
    localStorage.setItem("jwtToken", JSON.stringify(value));
  };

  const [expiryDate, setExpiryDateState] = useState(() => {
    if (localStorage.getItem("expiryDate")) {
      return JSON.parse(localStorage.getItem("expiryDate"));
    } else {
      return "";
    }
  });

  const setExpiryDate = (value) => {
    setExpiryDateState(value);
    localStorage.setItem("expiryDate", JSON.stringify(value));
  };

  const [sidebarOpened, setSidebarOpenedState] = useState(() => {
    if (localStorage.getItem("sidebarOpened")) {
      return JSON.parse(localStorage.getItem("sidebarOpened"));
    } else {
      return true;
    }
  });

  const [mode, setModeState] = useState(() => {
    if (localStorage.getItem("mode")) {
      return localStorage.getItem("mode");
    } else {
      return "dark";
    }
  });

  const setMode = (value) => {
    setModeState(value);
    localStorage.setItem("mode", value);
  };

  const [unit, setUnitState] = useState(() => {
    if (localStorage.getItem("unit")) {
      return localStorage.getItem("unit");
    } else {
      return "metric";
    }
  });

  const setUnit = (value) => {
    setUnitState(value);
    localStorage.setItem("unit", value);
  };

  const setSidebarOpened = (value) => {
    setSidebarOpenedState(value);
    localStorage.setItem("sidebarOpened", JSON.stringify(value));
  };

  // const [flowmetersHistoryMiddle, setFlowmetersHistoryMiddle] = useState(() => {
  //   const historyMid = localStorage.getItem("historyMiddleFlowmeters");
  //   if (historyMid) {
  //     const historyMidNum = Number(historyMid);
  //     return new Date(historyMidNum).getTime();
  //   } else {
  //     return Date.now() - 3 * 24 * 60 * 60 * 1000;
  //   }
  // });

  // const [flowmetersHistoryEnd, setFlowmetersHistoryEnd] = useState(() => {
  //   const historyEnd = localStorage.getItem("historyEndFlowmeters");
  //   if (historyEnd) {
  //     const historyEndNum = Number(historyEnd);
  //     return new Date(historyEndNum).getTime();
  //   } else {
  //     return Date.now();
  //   }
  // });

  return (
    <AppContext.Provider
      value={{
        currentRangeFlowmeters,
        setCurrentRangeFlowmeters,
        colorConfigRanges,
        setColorConfigRanges,
        abnormalSelectedIndex,
        setAbnormalSelectedIndex,
        selectedFlowmeterData,
        setSelectedFlowmeterData,
        acceptableDeviation,
        setAcceptableDeviation,
        heatmapColorConfigRanges,
        setHeatmapColorConfigRanges,
        authorized,
        setAuthorized,
        resetEmail,
        setResetEmail,
        route,
        setRoute,
        language,
        setLanguage,
        hierarchy,
        setHierarchy,
        parameterAdjustmentOpened,
        setParameterAdjustmentOpened,
        flatPipes,
        setFlatPipes,
        jwtToken,
        setJwtToken,
        expiryDate,
        setExpiryDate,
        sidebarOpened,
        setSidebarOpened,
        mode,
        setMode,
        unit,
        setUnit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppState;
