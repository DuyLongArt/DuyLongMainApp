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
import AdbIcon from '@mui/icons-material/Adb'; // Icon ví dụ cho logo

// Danh sách các trang để hiển thị trên thanh đi hướng
// theme.js
interface responsiveListProps{
  listPage:string[]
}
const  ResponsiveAppBar:React.FC<responsiveListProps>=({listPage,listPath})=> {
  // State để quản lý việc đóng/mở menu trên mobile

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

<Box sx={{border:"1px red solid",width:"100%"}}>
    <AppBar position="sticky"  >
    
        <Toolbar disableGutters>
          {/* --- LOGO (DESKTOP) --- */}
         

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
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
               {listPage.map((page) => (
                  <MenuItem 
                    key={page} 
                    onClick={handleCloseNavMenu} 
                    component="a" // Chuyển MenuItem thành thẻ <a>
                    href={`/home/${page.toLowerCase().replace(' ', '-')}`} // Tạo href hợp lệ
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
            {listPage.map((page) => (


               

                  <MenuItem 
                    key={page} 
                    onClick={handleCloseNavMenu} 
                    component="a" // Chuyển MenuItem thành thẻ <a>
                    href={`/home/${page.toLowerCase().replace(' ', '-')}`} // Tạo href hợp lệ
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                  
                ))}
          </Box>

          {/* --- NÚT HÀNH ĐỘNG (CTA) --- */}
          <Box sx={{ flexGrow: 0 }}>
             <Button variant="contained" color="secondary">
                Login
             </Button>
          </Box>
        </Toolbar>

    </AppBar>
     </Box>
  );
}
export default ResponsiveAppBar;

