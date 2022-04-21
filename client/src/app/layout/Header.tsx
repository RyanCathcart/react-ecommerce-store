import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: HeaderProps) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">React E-Commerce Store</Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
}
