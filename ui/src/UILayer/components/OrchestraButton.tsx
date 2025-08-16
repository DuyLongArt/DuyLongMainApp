import { Button } from '@mui/material';
import { MainAppIcon } from '../DataLayer/LocalDataLayer/IconAssets';
import MotionImageSpinner from "../UILayer/UILogics/Spin.tsx";
const OrchestraButton=({onClick})=>{
return (
<Button onClick={onClick}>

   <MotionImageSpinner imageUrl={MainAppIcon}  />


</Button>
);
}
export default OrchestraButton;