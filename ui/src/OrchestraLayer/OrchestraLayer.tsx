import React from "react";
import ChildrenInterface from "./ChildrenComponent";
import Box from "@mui/material/Box";
import { Provider } from "react-redux";
import { Store } from "./ReduxToolkit/Store";

const OrchestraLayer:React.FC<ChildrenInterface> =({children})=>{
    return (
        <Box>
            <Provider store={Store}>
                {children}
            </Provider>
            
        </Box>
    )
}
export default OrchestraLayer;