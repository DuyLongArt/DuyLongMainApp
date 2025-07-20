import Box from '@mui/material/Box';
import ResponsiveAppBar from '../../../RouterLayer/ResponsiveAppbar';
import ChildrenInterface from '../../../OrchestraLayer/ChildrenComponent';
import { navigatorList } from '../../../DataLayer/NavigatorList';
import { Outlet } from 'react-router-dom';
import OrchestraButton from '../../../OrchestraLayer/OrchestraButton';

const HomeLayout: React.FC <ChildrenInterface>= ({children}) => {
    return(
        <Box sx={{border:"1px solid blue"}}>
      <Box sx={{display:"flex",flexDirection:"row"}}>
        <OrchestraButton/>
                    <ResponsiveAppBar listPage={navigatorList} />
                    </Box>
        <Outlet/>
        {children}
      </Box>


    );
}
export default HomeLayout;