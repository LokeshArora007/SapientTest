export const styles = data => {
  return {
    root: {
      display: "flex",
      justifyContent: "flex-start",
      width: "auto",
      border: `1px solid ${data.hasError ? "red" : "blue"}`,
      height: "100%"
    },
    input: { outline: "none" },
    button: { height: "100%", border: 0 },
    errorMessage: {
      color: "red",
      fontSize: 12
    }
  };
};
