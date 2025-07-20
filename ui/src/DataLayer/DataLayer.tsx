import React, { useEffect } from "react";
import ChildrenInterface from "../OrchestraLayer/ChildrenComponent";
import Box from "@mui/material/Box";

const DataLayer:React.FC<ChildrenInterface>=({children})=>{
    //init data
    useEffect(()=>{
        sessionStorage.setItem("authen","false");
    },[])
return(
    <Box>
        {children}
    </Box>
)
}
export default DataLayer;