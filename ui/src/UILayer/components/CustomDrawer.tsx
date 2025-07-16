import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import React from "react";
interface drawerProps{
    isOpen:boolean;
    onClose:(isOpen:boolean)=>void;
}
const CustomDrawer:React.FC<drawerProps>=({isOpen,onClose})=>{ 
   const handleOnClose:void =(variable)=>{
    isOpen=variable;
   }
    return (
        <Box>
  <Drawer anchor="left" open={isOpen} onClose={onClose}>
        {/*
          The Box component is used here to give some basic styling to the drawer content.
          You'd typically put your menu items, navigation links, etc., inside the Box.
        */}
        <Box>
          
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon onClick={()=>onClose}><InboxIcon /></ListItemIcon>
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
    </Box>
        )
}
export default CustomDrawer;