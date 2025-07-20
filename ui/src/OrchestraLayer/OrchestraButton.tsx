import { Button, IconButton } from '@mui/material';
import React, { Children } from 'react';
import ChildrenComponent from './ChildrenComponent';
import { MainAppIcon } from '../DataLayer/IconAssets';
const OrchestraButton:React.FC<ChildrenComponent>=({children})=>{
return (
<Button onClick={(true)}>

   
            <img src={MainAppIcon} style={{width:"55px",height:"55px"}} />
            {children}
</Button>
);
}
export default OrchestraButton;