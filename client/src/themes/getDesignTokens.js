export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          // palette values for light mode
          //   primary: amber,
          //   divider: "",
          background: {
            default: "#1A1A1A",
            paper: "#163B64",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#FFFFFF",
          },
        }
      : {
          // palette values for dark mode
          background: {
            default: "#FFFFFF",
            paper: "#163B64",
          },
          text: {
            primary: "#163B64",
            secondary: "#000000",
          },
        }),
  },
});
