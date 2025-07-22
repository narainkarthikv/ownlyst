import React, { useState } from "react";
import { AppBar, Box, IconButton, Typography, Drawer, Toolbar, styled, useTheme, Grid, Tooltip } from "@mui/material";
import { themeModeState, themeState } from '../../utils/state';
import { useRecoilState } from 'recoil';
import MenuIcon from "@mui/icons-material/Menu";
import { ChevronLeft, ChevronRight, Brightness4, Brightness7 } from "@mui/icons-material";
import DrawerItems from "./Navbar/DrawerItems";
import WorkspaceSelector from '../common/WorkspaceSelector';
import ThemeToggle from '../common/ThemeToggle';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down('sm')]: {
    height: '56px',
    padding: theme.spacing(1),
  },
}));

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
  ...(!open && {
    "& .MuiDrawer-paper": {
      width: theme.spacing(7),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
    },
  }),
  [theme.breakpoints.down('sm')]: {
    "& .MuiDrawer-paper": {
      width: open ? drawerWidth : theme.spacing(9),
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainContent = styled(Box)(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  overflow: "hidden",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    marginLeft: 0,
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useRecoilState(themeState);
  const [mode, setMode] = useRecoilState(themeModeState);
  const [workspace, setWorkspace] = useState('default');

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);  
  const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <StyledAppBar position="fixed" open={drawerOpen}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ ...(drawerOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: '500',
                marginLeft: 2,
                [theme.breakpoints.down('sm')]: { fontSize: '1rem', marginLeft: 1 },
              }}
            >
              Sticky Memo
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <WorkspaceSelector value={workspace} onChange={e => setWorkspace(e.target.value)} />
            <ThemeToggle onToggle={toggleMode} />
          </Box>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <DrawerItems />
      </StyledDrawer>

      <MainContent open={drawerOpen}>
        <Grid container spacing={2}>
          {/* Main content goes here */}
        </Grid>
      </MainContent>
    </Box>
  );
};

export default Navbar;
