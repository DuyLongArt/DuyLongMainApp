import Box from '@mui/material/Box';
import './App.css'

import HomePage from "./UILayer/pages/Home/HomePage";
import { authenState } from './OrchestraLayer/XState/AuthenState';
import { BrowserRouter } from 'react-router-dom';
import AppRouterLayer from './RouterLayer/AppRouterLayer';
import SecurityLayer from './SecurityLayer/SecurityLayer';
import DataLayer from './DataLayer/DataLayer';
import OrchestraLayer from './OrchestraLayer/OrchestraLayer';
import { useMachine } from '@xstate/react';


const  App:React.FC=()=> {
  return (
    <Box>
       
              <BrowserRouter>
              <DataLayer>
          
             
              <OrchestraLayer >
                
                <SecurityLayer>
          
             
                <AppRouterLayer>
                    <HomePage/>
                </AppRouterLayer>
                   </SecurityLayer>
                      

              </OrchestraLayer>
               </DataLayer>
               </BrowserRouter>
   

    </Box>
  )
}
export default App
