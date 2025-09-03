import Box from '@mui/material/Box';
import {ChildrenInterface} from '../../../OrchestraLayer/ChildrenComponent';
import {ColaborateIcon} from "../../components/AvatarFloatButton.tsx";
import React from "react";
import {CassettePlayer} from "../../components/NostagiaComponent/CassettePlayer.tsx";
import {VinylRecord} from "../../components/NostagiaComponent/VinylRecord.tsx";


const HomePage: React.FC <ChildrenInterface>= ({children}) => {
    return(
        
      <Box>

        {/*{children}*/}
          <CassettePlayer/>

          <VinylRecord/>
      </Box>

    );
}
export default HomePage;