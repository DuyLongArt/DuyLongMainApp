import Box from '@mui/material/Box';
import './App.css'

import HomePage from "./UILayer/pages/Home/HomePage";
import { authenState } from './OrchestraLayer/StateManager/XState/AuthenState';
import { BrowserRouter } from 'react-router-dom';
import AppRouterLayer from './RouterLayer/AppRouterLayer';
import SecurityLayer from './SecurityLayer/SecurityLayer';
import LocalDataLayer from './DataLayer/LocalDataLayer/LocalDataLayer';
import OrchestraLayer from './OrchestraLayer/OrchestraLayer';
import { useMachine } from '@xstate/react';


const  App:React.FC=()=> {
  return (
    <Box>
       
              <BrowserRouter>
              <LocalDataLayer>
          
             
              <OrchestraLayer >
                
                <SecurityLayer>
          
             
                <AppRouterLayer>
                    <HomePage/>
                </AppRouterLayer>
                   </SecurityLayer>
                      

              </OrchestraLayer>
               </LocalDataLayer>
               </BrowserRouter>
   

    </Box>
  )
}
export default App
