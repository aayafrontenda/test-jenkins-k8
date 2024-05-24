export const colors = (theme) => {
  return {
    activeTab: theme === "dark" ? "#4C88FF" : "#A0A0A0",
    hovered: theme === "dark" ? "#4C88FF" : "#FFFFFF",
    inactiveTab: theme === "dark" ? "#A0A0A0" : "#FFFFFF",
  };
};
