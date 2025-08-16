import Box from "@mui/material/Box";
import React, { Children, useContext, useEffect } from "react";
import {ChildrenInterface} from "../OrchestraLayer/ChildrenComponent";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../OrchestraLayer/XState/AuthenState";
import { useActor, useActorRef, useSelector } from "@xstate/react";

const SecurityLayer :React.FC<ChildrenInterface> =({children})=>{
    const navigate=useNavigate();
// Use useActor to get state and send from AuthContext
// This one line does the job of your two lines
const actorRef=AuthContext.useActorRef();
const state = useSelector(actorRef, (snapshot) => snapshot);

useEffect(() => {
  // Helpful logging
  // const [state] = useMachine(authenState); // or however you get `state`
  // console.log('State value:', state.value);
  // console.log('isOnLogin:', isOnLogin);
  console.log("State: "+state);
  if (state.matches("onLogin")) {
    sessionStorage.setItem('redirect', 'true');
    navigate('/home/index', { replace: true });
  } else if (sessionStorage.getItem('redirect') !== 'true') {
    navigate('/login', { replace: true });
  }
}, [state]);
    return (
    
        <Box>
            {children}
        </Box>
    
    )
}
export default SecurityLayer;

