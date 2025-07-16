import Box from "@mui/material/Box";
import ChildrenInterface from "../OrchestraLayer/ChildrenComponent";
import { Route, Routes } from "react-router";
import HomePage from "../UILayer/pages/Home/HomePage";
import NotFoundPage from "../UILayer/pages/Error/NotFoundPage";
import WidgetMainPage from "../UILayer/pages/Widget/WidgetMainPage";
const RouterMaster:React.FC<ChildrenInterface>=({children})=>{
return (
    <Box>
        
<Routes>
  

  <Route path="/home" element={<HomePage />} />
  <Route path="/widget" element={<WidgetMainPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
        {children}
    </Box>
)
}
export default RouterMaster;
