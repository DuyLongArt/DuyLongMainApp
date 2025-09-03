import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import { ChildrenInterface } from "../OrchestraLayer/ChildrenComponent";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../OrchestraLayer/StateManager/XState/AuthenState";
import { useActor, useActorRef, useSelector } from "@xstate/react";

const SecurityLayer: React.FC<ChildrenInterface> = ({ children }) => {
    const navigate = useNavigate();
    const [hasInitialCheck, setHasInitialCheck] = useState(false);

    const actorRef = AuthContext.useActorRef();
    const state = useSelector(actorRef, (snapshot) => snapshot);

    // Initial check on component mount
    useEffect(() => {
        console.log("Initial state check: ", state);
        checkAuthAndNavigate();
        setHasInitialCheck(true);
    }, []); // Empty dependency - runs only on mount

    // Check on state changes (after initial check)
    useEffect(() => {
        if (hasInitialCheck) {
            console.log("State changed: ", state);
            checkAuthAndNavigate();
        }
    }, [state, hasInitialCheck]);

    const checkAuthAndNavigate = () => {
        if (state && state.matches("onLogin")) {
            sessionStorage.setItem('redirect', 'true');
            navigate('/home/index', { replace: true });
        }
        // else if (state) {
        //     navigate('/login/form', { replace: true });
        // }
    };

    return (
        <Box>
            {children}
        </Box>
    );
};

export default SecurityLayer;