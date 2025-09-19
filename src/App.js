import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Cairo"],
    },
    palette: {
      primary: {
        main: "#6b100aff",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#ecececff",
          direction: "rtl",
        }}
      >
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
