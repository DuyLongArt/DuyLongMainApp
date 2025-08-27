import Box from '@mui/material/Box';
import {ChildrenInterface} from '../../../OrchestraLayer/ChildrenComponent';
import {ColaborateIcon} from "../../components/AvatarFloatButton.tsx";
import React from "react";


const HomePage: React.FC <ChildrenInterface>= ({children}) => {
    return(
        
      <Box>

        {children}

      </Box>

    );
}
export default HomePage;