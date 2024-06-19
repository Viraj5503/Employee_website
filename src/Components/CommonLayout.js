import React from "react";
import {
  Box,
  IconButton,
  Avatar,
  MenuItem,
  Menu,
  Tooltip,
  Toolbar,
  Container,
  AppBar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../Images/logo_final.png'

const drawerWidth = 200;

export default function CommonLayout() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const [activeItem, setActiveItem] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    if (currentUser) {
      setUser(currentUser);
    } else navigate("/login");
  }, [navigate]);

//   useEffect(() => {
//     setActiveItem("Dashboard");
//     //   console.log(activeItem)
//   }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleDrawerItems = (text, path) => {
    setActiveItem(text);
    navigate(path);
  };

  const icons = [<DashboardIcon />, <InfoIcon />, <PhoneIcon />];
  const navigateArray = ["/homepage", "/employee", "/contact"];

  return (
    <Box sx={{display:'flex'}}>
      <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
          <Container maxWidth="xl">
            {user && (
              <Box
                disableGutters
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems:'center'
                }}
              >
                <img onClick={() => navigate('/homePage')} style={{height:76}} alt="logo" src={logo}></img>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: "white", color: "#1976d2" }}>
                      {user.firstName[0].toUpperCase()}
                    </Avatar>
                    <p style={{ color: "white", fontFamily: "sans-serif" }}>
                      &nbsp;
                      {user.firstName[0].toUpperCase() +
                        user.firstName.slice(1)}
                    </p>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Container>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {["Dashboard", "Employees", "Contact Us"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleDrawerItems(text, navigateArray[index])
                    }}
                    selected={activeItem === text}
                  >
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
    </Box>
  );
}
