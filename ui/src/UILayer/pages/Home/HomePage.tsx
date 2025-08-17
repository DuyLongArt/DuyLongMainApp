import Box from '@mui/material/Box';
import {ChildrenInterface} from '../../../OrchestraLayer/ChildrenComponent';


const HomePage: React.FC <ChildrenInterface>= ({children}) => {
    return(
        
      <Box>
           

        {children}
      </Box>

    );
}
export default HomePage;