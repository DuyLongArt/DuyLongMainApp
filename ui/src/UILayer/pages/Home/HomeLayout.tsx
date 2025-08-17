import Box from '@mui/material/Box';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import {ChildrenInterface} from '../../../OrchestraLayer/ChildrenComponent';
import { pageList ,pathList} from '../../../RouterLayer/RouterProtocol.ts';
import { Outlet } from 'react-router-dom';
import OrchestraButton from '../../components/OrchestraButton.tsx';
import CustomDrawer from '../../components/CustomDrawer';
import { orchestraButton } from '../../../OrchestraLayer/StateManager/XState/OrchestraButton';
import { useMachine } from '@xstate/react';

const HomeLayout: React.FC <ChildrenInterface>= ({children}) => {
const [state,send]=useMachine(orchestraButton);
    return(
        <Box sx={{border:"1px solid blue"}}>
      <Box sx={{display:"flex",flexDirection:"row"}}>
           <OrchestraButton onClick={() => send({ type: 'CLICK' })} />
                    <ResponsiveAppBar pageList={pageList} pathList={pathList}/>
                    </Box>
          <Box>
              <CustomDrawer isOpen={state.matches("onButtonOpen")}  onClose={() => send({ type: 'CLOSE' })}/>
          </Box>
        <Outlet/>
        {children}
      </Box>


    );
}
export default HomeLayout;