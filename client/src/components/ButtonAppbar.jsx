import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/Menu";
import { useAuth } from "../context/AuthContext";

export function ButtonAppBar() {
  const { logout, user } = useAuth();
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="fixed" sx={{ width: "100%" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AppName
          </Typography>
          <Button
            onClick={() => logout.mutate()}
            disabled={logout.isLoading}
            sx={{ color: "white" }} // Set text color to white
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
