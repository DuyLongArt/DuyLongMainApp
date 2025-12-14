import Box from '@mui/material/Box';
import type { ChildrenInterface } from '../../../OrchestraLayer/ChildrenComponent';
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