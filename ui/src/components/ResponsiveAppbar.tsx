import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb'; // Icon ví dụ cho logo
import {ThemeProvider} from "@mui/material";
import containerTheme from "../styles/ContainerStyle.tsx";
import AppIcon from "../assets/AppMainIcon_White.png"; // Import icon logo của bạ
// Danh sách các trang để hiển thị trên thanh đi hướng



// theme.js



function ResponsiveAppBar({openDrawerGoUpProps}) {
  // State để quản lý việc đóng/mở menu trên mobile
  console.log("ResponsiveAppBar.tsx is running");
  const [page1,setPage1]=React.useState<string>("Personal");
  console.log("Page1: ",page1);
  const [page2,setPage2]=React.useState<string>("Widget");
  const [page3,setPage3]=React.useState<string>("Contact");
  const pages = [page1,page2,page3];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    // AppBar là container chính, 'sticky' để nó dính lại khi cuộn
      // <ThemeProvider theme={DefaultTheme}>


    <AppBar position="sticky"  >
      <Container sx={{minWidth:"100%" ,paddingLeft:"0px",paddingRight:"0px"}} style={{paddingLeft:"15px",paddingRight:"15px"}}>
        <Toolbar disableGutters>
          {/* --- LOGO (DESKTOP) --- */}
          <IconButton onClick={openDrawerGoUpProps(true)}>

   
            <img src={AppIcon} style={{width:"55px",height:"55px"}} />
</IconButton>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
             
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'timenewroman',
              fontWeight: 700,
      
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DuyLongApp
          </Typography>

          {/* --- MENU (MOBILE) --- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
               {pages.map((page) => (
                  <MenuItem 
                    key={page} 
                    onClick={handleCloseNavMenu} 
                    component="a" // Chuyển MenuItem thành thẻ <a>
                    href={`/${page.toLowerCase().replace(' ', '-')}`} // Tạo href hợp lệ
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                  
                ))}
            </Menu>
          </Box>
          
          {/* --- LOGO (MOBILE) --- */}
           
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* --- CÁC LIÊN KẾT (DESKTOP) --- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (


               

                  <MenuItem 
                    key={page} 
                    onClick={handleCloseNavMenu} 
                    component="a" // Chuyển MenuItem thành thẻ <a>
                    href={`/${page.toLowerCase().replace(' ', '-')}`} // Tạo href hợp lệ
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                  
                ))}
          </Box>

          {/* --- NÚT HÀNH ĐỘNG (CTA) --- */}
          <Box sx={{ flexGrow: 0 }}>
             <Button variant="contained" color="secondary">
                Đăng nhập
             </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      // </ThemeProvider>
  );
}
export default ResponsiveAppBar;

