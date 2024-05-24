import React, { useContext, useEffect, useState } from "react";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import AppContext from "../../../context/app-context";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { formatMessage as translate } from "devextreme/localization";
import { ruRU, kzKZ, enUS } from "@mui/x-date-pickers/locales/";
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekStart: 1,
});

dayjs.updateLocale("ru", {
  months: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  weekdays: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
});

export default function CalendarPicker({
  middle,
  setMiddle,
  end,
  setEnd,
  setText,
}) {
  const shortcutsItems = [
    {
      label: translate("Today"),
      getValue: () => {
        const today = dayjs();
        return [today.startOf("day"), today.endOf("day")];
      },
    },
    {
      label: translate("Yesterday"),
      getValue: () => {
        const today = dayjs();
        return [
          today.subtract(1, "day").startOf("day"),
          today.subtract(1, "day").endOf("day"),
        ];
      },
    },
    {
      label: translate("ThisWeek"),
      getValue: () => {
        const today = dayjs();
        return [today.startOf("week"), today.endOf("week")];
      },
    },
    {
      label: translate("LastWeek"),
      getValue: () => {
        const today = dayjs();
        const prevWeek = today.subtract(7, "day");
        return [prevWeek.startOf("week"), prevWeek.endOf("week")];
      },
    },
    {
      label: translate("ThisMonth"),
      getValue: () => {
        const today = dayjs();
        return [today.startOf("month"), today.endOf("month")];
      },
    },
    {
      label: translate("LastMonth"),
      getValue: () => {
        const today = dayjs();
        return [
          today.subtract(1, "month").startOf("month"),
          today.subtract(1, "month").endOf("month"),
        ];
      },
    },
    {
      label: translate("Reset"),
      getValue: () => {
        return [dayjs(), dayjs()];
      },
    },
  ];

  const { language } = useContext(AppContext);

  return (
    <StaticDateRangePicker
      localeText={
        language === "ru"
          ? ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          : language === "kz"
          ? kzKZ.components.MuiLocalizationProvider.defaultProps.localeText
          : enUS.components.MuiLocalizationProvider.defaultProps.localeText
      }
      value={
        // dayjs(flowmetersHistoryEnd).isAfter(dayjs(flowmetersHistoryMiddle))
        [dayjs(middle), dayjs(end)]
        // : [dayjs(flowmetersHistoryEnd), dayjs(flowmetersHistoryMiddle)]
      }
      onChange={(newValue) => {
        if (newValue[0] && newValue[1]) {
          if (newValue[1].isAfter(newValue[0])) {
            setMiddle(newValue[0].add(5, "hour").unix() * 1000);
            setEnd(newValue[1].add(5, "hour").unix() * 1000);
          } else {
            setMiddle(newValue[1].add(5, "hour").unix() * 1000);
            setEnd(newValue[0].add(5, "hour").unix() * 1000);
          }
          setText("Custom");
        }
        // setFlowmetersHistoryMiddle(newValue[0].add(5, "hour").toString());
        // setFlowmetersHistoryEnd(newValue[1].add(5, "hour").toString());
      }}
      slotProps={{
        shortcuts: {
          items: shortcutsItems,
          onClick: (e) => {
            const labels = shortcutsItems.map((item) => item.label);
            for (let i = 0; i < labels.length; i++) {
              if (String(e.target.innerHTML).includes(labels[i])) {
                setText(labels[i] !== translate("Reset") ? labels[i] : "");
              }
            }
          },
        },
        actionBar: {
          actions: [],
        },
      }}
      sx={{
        "&": {
          // overflow: "hidden",
        },
      }}
      calendars={2}
    />
  );
}
