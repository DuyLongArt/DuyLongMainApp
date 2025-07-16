import Box from '@mui/material/Box';
import ResponsiveAppBar from '../../components/ResponsiveAppbar';
import ChildrenInterface from '../../../OrchestraLayer/ChildrenComponent';
import { navigatorList } from '../../../DataLayer/NavigatorList';

const HomePage: React.FC <ChildrenInterface>= ({children}) => {
    return(
        
      <Box>
        <ResponsiveAppBar listPage={navigatorList} />
        {children}
      </Box>

    );
}
export default HomePage;