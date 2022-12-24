import {
    IconButton,
    Grid,
    Box,
    AppBar,
  } from "@mui/material";
  import React from "react"
  import { useState, useEffect} from "react";
  import "./index.css";
  import Toolbar from "@mui/material/Toolbar";
  import Typography from "@mui/material/Typography";
  import Menu from "@mui/material/Menu";
  import Avatar from "@mui/material/Avatar";
  import Tooltip from "@mui/material/Tooltip";
  import MenuItem from "@mui/material/MenuItem";
  import { getUser } from "../../api.service";
  import { IUser } from "../../model"
  import { useHistory } from "react-router-dom";
  import fastTagLogo from "../../static/fasttag1.png"
  import iconLogo from "../../static/icons-user.png"


  const settings = ["Logout"];
  
  const NavBar: React.FC = () => {

    const history = useHistory();

    const defaultValue:IUser = {};

    let [user, setUser] = useState(defaultValue);
  
    useEffect(() => {
        getUser().then((res) => {
          console.log(res , 'hello');
            setUser(res);
        })
        .catch((err) => {
            alert(err.message);
            history.push('/signin');
        });
    }, [])

    
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
      null
    );
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const logOut = () => {
      localStorage.removeItem('token');
      history.push("/signin");
    }


    return (
      <>  
        <AppBar id="navbar" position="static">
          
          <Toolbar disableGutters>
          
            <Box sx={{ flexGrow: 1 }}>
              
              <Grid className="navbar-div" container spacing={2}>
                
                <Grid item xs={6} className="navbar-header">
                  <Typography
                    variant="h3"
                    noWrap
                    component="div"
                    className="nav-logo"
                    sx={{ mr: 2, ml: 5, display: { xs: "none", md: "flex" } }}
                  >
                    <img className="fastag-logo-2" src={fastTagLogo}></img>

                  </Typography>

                </Grid>
  
                <Grid className="nav-right" item xs={6}>

                  {/* <img className="fastag-logo-1" src="images/fastTag.png"></img> */}
        
                  <div className="nav-rightNav">

                    <Box className="username" sx={{ flexGrow: 0 }}>
                        <p> {user.username} </p>
                    </Box>
        
  
                    <Box className="nav-menu" sx={{ flexGrow: 0 }}>
                      <Tooltip title="Options" className="nav-icon">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            // alt="Aatman"
                            // src="/broken-image.jpg"
                            // src="images/icons-user.png"
                            src={iconLogo}
                            sx={{width: 40, heigh: 20}}

                          />
                        </IconButton>
                      </Tooltip>
                      
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {settings.map((setting) => (
                          <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="right" onClick={logOut}>{setting}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Toolbar>
        </AppBar>
      </>
    );
  };
  
  export default NavBar;
  