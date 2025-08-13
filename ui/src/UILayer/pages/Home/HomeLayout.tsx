import Box from '@mui/material/Box';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import ChildrenInterface from '../../../OrchestraLayer/ChildrenComponent';
import { navigatorList } from '../../../DataLayer/NavigatorList';
import { Outlet } from 'react-router-dom';
import OrchestraButton from '../../../OrchestraLayer/OrchestraButton';
import CustomDrawer from '../../components/CustomDrawer';
import { orchestraButton, OrchestraButtonContext } from '../../../OrchestraLayer/XState/OrchestraButton';
import { useSelector } from 'react-redux';
import { useMachine } from '@xstate/react';

const HomeLayout: React.FC <ChildrenInterface>= ({children}) => {
const [state,send]=useMachine(orchestraButton);
    return(
        <Box sx={{border:"1px solid blue"}}>
      <Box sx={{display:"flex",flexDirection:"row"}}>
           <OrchestraButton onClick={() => send({ type: 'CLICK' })} />
                    <ResponsiveAppBar listPage={navigatorList} />
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