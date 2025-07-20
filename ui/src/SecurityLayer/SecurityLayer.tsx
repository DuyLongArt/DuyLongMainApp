import Box from "@mui/material/Box";
import React, { Children, useEffect } from "react";
import ChildrenInterface from "../OrchestraLayer/ChildrenComponent";
import { isPassAuthen } from "../DataLayer/LocalSession";
import { useNavigate } from "react-router-dom";
const SecurityLayer :React.FC<ChildrenInterface> =({children})=>{
    const navigate=useNavigate();
    sessionStorage.setItem("redirect","false");
    useEffect(()=>{
  if(isPassAuthen){
    navigate("home/index");
    sessionStorage.setItem("redirect","true");
  }
  else if (!isPassAuthen&&!(sessionStorage.getItem("redirect")==="true")){
    navigate("login");
  }
    },[])
  
    return (
        <Box>
            {children}
        </Box>
    )
}
export default SecurityLayer;