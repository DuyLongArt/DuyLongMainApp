import Box from "@mui/material/Box";
import ChildrenInterface from "../OrchestraLayer/ChildrenComponent";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "../UILayer/pages/Home/HomePage";
import NotFoundPage from "../UILayer/pages/Error/NotFoundPage";
import WidgetMainPage from "../UILayer/pages/Widget/WidgetMainPage";
import { navigatorList } from "../DataLayer/NavigatorList";
import ResponsiveAppBar from "../UILayer/components/ResponsiveAppbar";
import HomeLayout from "../UILayer/pages/Home/HomeLayout";
import LoginPage from "../UILayer/pages/Login/LoginPage";
import PersonPage from "../UILayer/pages/Personal/PersonPage";
const AppRouterLayer:React.FC<ChildrenInterface>=({children})=>{
return (
    <Box>
   
      
<Routes>
  


  <Route path="home" element={<HomeLayout />} >
  <Route path="index" element={<HomePage/>} />
    <Route path="widget" element={<WidgetMainPage />} />
    <Route path="personal" element={<PersonPage/>} />

  </Route>
  <Route path="login" element={<LoginPage/>}/>
  <Route path="*" element={<NotFoundPage />} />
</Routes>
        {children}
    
</Box>
)
}
export default AppRouterLayer;


