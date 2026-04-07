import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useUserInfoQuery } from "../../features/account/accountApi";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import { ThemeToggleSwitch } from "../components/ThemeToggleSwitch";
import type { BasketItem } from "../models/basket";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import UserMenu from "./UserMenu";

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": { color: "grey.500" },
  "&.active": { color: "text.secondary" },
};

const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

export default function NavBar() {
  const { isLoading, darkMode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { data: basket } = useFetchBasketQuery();
  const { data: user} = useUserInfoQuery();

  const itemCount = basket?.items.reduce((sum: number, item: BasketItem) => sum + item.quantity, 0) || 0;

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            component={NavLink}
            to="/"
            sx={navStyles}
            noWrap
          >
            REACT E-STORE
          </Typography>
          <ThemeToggleSwitch checked={darkMode} onChange={() => dispatch(setDarkMode())} />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            flexGrow: 0,
          }}
        >
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
            {/*{user && user.roles?.includes("Admin") && (*/}
            {/*  <ListItem component={NavLink} to={"/inventory"} sx={navStyles}>*/}
            {/*    INVENTORY*/}
            {/*  </ListItem>*/}
            {/*)}*/}
          </List>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}

        </Box>
        {/*<SmallScreenMenu midLinks={midLinks} rightLinks={rightLinks} />*/}
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  );
}