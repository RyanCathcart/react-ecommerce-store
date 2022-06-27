import { Box, Divider, Fade, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";

interface SmallScreenMenuProps {
  midLinks?: any[];
  rightLinks?: any[];
}

export default function SmallScreenMenu({
  midLinks,
  rightLinks,
}: SmallScreenMenuProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        flexDirection: "row-reverse",
        flexGrow: 1,
      }}
    >
      <IconButton
        size="large"
        aria-label="navigation"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {midLinks?.map((link) => (
          <MenuItem
            key={link.title}
            component={Link}
            to={link.path}
            onClick={handleClose}
          >
            {link.title}
          </MenuItem>
        ))}
        <Divider />
        {user ? (
          <div>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem component={Link} to="/orders">
              My orders
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(signOut());
                dispatch(clearBasket());
              }}
            >
              Sign out
            </MenuItem>
          </div>
        ) : (
          rightLinks?.map((link) => (
            <MenuItem
              key={link.title}
              component={Link}
              to={link.path}
              onClick={handleClose}
            >
              {link.title}
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
}
