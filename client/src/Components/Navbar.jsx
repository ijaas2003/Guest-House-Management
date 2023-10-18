import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
//import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "../hooks/useMediaQuery";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { logout } = useLogout();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const Media = useMediaQuery("(min-width:1070px)");
  const { user } = useAuthContext();
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const Handlelogout = () => {
    logout();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={Handlelogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <motion.div
      initial={{ y: "-100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: "200" }}
    >
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            style={{ backgroundColor: "#0a0a27", height: "80px" }}
          >
            <div style={{ marginTop: `${Media ? "7px" : "15px"}` }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  House Rentles
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {!user && (
                  <div>
                    <Button color="inherit">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={"/login"}
                      >
                        Login
                      </Link>
                    </Button>
                    <Button color="inherit">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={"/signup"}
                      >
                        Signup
                      </Link>
                    </Button>
                  </div>
                )}
                {
                  user?.types == "owner" && (
                      <button className="p-[10px] bg-white text-primarycolor hover:px-[25px] duration-[1s] rounded-lg"><Link to={'/seebooking'}>See Booking</Link></button>
                  ) 
                }
                {user && (
                  <div>
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                      <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{ marginTop: "10px" }}
                        sx={{ display: { xs: "none", sm: "block" } }}
                      >
                        <IconButton
                          size="large"
                          edge="end"
                          aria-label="account of current user"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          onClick={handleProfileMenuOpen}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>{" "}
                        {user.Email}
                      </Typography>
                      <div className="mx-[20px] mt-[10px]">
                        <button className="bg-white text-primarycolor font-bold rounded-md p-[10px]" onClick={() => Handlelogout()}>LogOut</button>
                      </div>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                      <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                      >
                        <MoreIcon />
                      </IconButton>
                    </Box>
                  </div>
                )}
              </Toolbar>
            </div>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </div>
    </motion.div>
  );
};

export default Navbar;
