import { Box, Container, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router";
import NavBar from "./app/layout/NavBar";
import { useAppSelector } from "./app/store/store";

function App() {
  const { darkMode } = useAppSelector(state => state.ui);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <ScrollRestoration />
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "radial-gradient(circle, #1e3aBa, #111b27)"
            : "radial-gradient(circle, #baecf9, #f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;