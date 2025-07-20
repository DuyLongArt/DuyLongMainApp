import Box from '@mui/material/Box';
import ResponsiveAppBar from '../../../RouterLayer/ResponsiveAppbar';
import ChildrenInterface from '../../../OrchestraLayer/ChildrenComponent';
import { navigatorList } from '../../../DataLayer/NavigatorList';
import { Outlet } from 'react-router-dom';

const HomePage: React.FC <ChildrenInterface>= ({children}) => {
    return(
        
      <Box>
            

        {children}
      </Box>

    );
}
export default HomePage;