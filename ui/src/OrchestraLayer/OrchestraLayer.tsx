import React from "react";
import ChildrenInterface from "./ChildrenComponent";
import Box from "@mui/material/Box";
import { Provider } from "react";
import { Store } from "./ReduxToolkit/Store";
import { AuthContext, authenState } from "./XState/AuthenState";
import { useActor, useMachine } from "@xstate/react";
import { StateMachine, AnyEventObject, AnyActorRef, ProvidedActor, ParameterizedObject, StateValue, NonReducibleUnknown, EventObject, MetaObject } from "xstate";
import OrchestraButton from "./OrchestraButton";
import { OrchestraButtonContext } from "./XState/OrchestraButton";

const OrchestraLayer:React.FC<ChildrenInterface> =({children})=>{
  
      
    return (
        <Box>
            <AuthContext.Provider>
                <OrchestraButtonContext.Provider>
                    {children}
                </OrchestraButtonContext.Provider>
            </AuthContext.Provider>
        </Box>
    )
}
export default OrchestraLayer;



