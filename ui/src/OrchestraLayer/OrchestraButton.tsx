import { Button, IconButton } from '@mui/material';
import React, { Children } from 'react';
import ChildrenComponent from './ChildrenComponent';
import { MainAppIcon } from '../DataLayer/IconAssets';
const OrchestraButton=({onClick})=>{
return (
<Button onClick={onClick}>

   
            <img src={MainAppIcon} style={{width:"55px",height:"55px"}} />
            
</Button>
);
}
export default OrchestraButton;