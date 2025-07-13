import { Route, Routes } from "react-router-dom"
import './App.css'
import WidgetMainPage from './pages/Widget/WidgetMainPage'
import PersonPage from "./pages/Personal/PersonPage"
import ResponsiveAppBar from "./components/ResponsiveAppbar";
import ErrorPage from "./pages/Error/ErrorPage";
import { Drawer, Button, ButtonBase, Icon, Box, ListItem, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';


function App() {
  
const [open, setOpen] = React.useState(false);

 
  function handleOpenDrawerGoupProps(arg0: boolean): React.MouseEventHandler<HTMLDivElement> | undefined {
     return (event) => {
    // Optionally, ignore tab/shift+tab key events for accessibility
    // if (
    //   event.type === 'keydown' &&
    //   ((event as unknown as React.KeyboardEvent).key === 'Tab' ||
    //     (event as unknown as React.KeyboardEvent).key === 'Shift')
    // ) {
    //   return;
    // }
   
     setOpen(arg0);
    
    console.log("Open drawer")
   
  };
  }

  return (
    <>
        <div style={{ width: "100%" }}>
            <ResponsiveAppBar openDrawerGoUpProps={() => handleOpenDrawerGoupProps(true)}/>
        </div>
         <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer anchor="left" open={open} onClose={handleOpenDrawerGoupProps(false)}>
        {/*
          The Box component is used here to give some basic styling to the drawer content.
          You'd typically put your menu items, navigation links, etc., inside the Box.
        */}
        <Box>
          
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary="Mail" />
              </ListItemButton>
            </ListItem>
          </List>
      
        </Box>
      </Drawer>
    </>
    

      <div>
        <Routes>
          <Route path="/" element={<h2>Welcome to DuyLong App</h2>} />
          <Route path="/index" element={<h2>Welcome to DuyLong App</h2>} />
          <Route path="/widget" element={<WidgetMainPage />} />
          <Route path="/personal" element={<PersonPage />} />
          <Route path="*"  element= {<ErrorPage />} />

        </Routes>
      </div>

    </>
  )
}
export default App
