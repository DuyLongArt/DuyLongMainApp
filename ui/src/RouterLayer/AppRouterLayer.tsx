import Box from "@mui/material/Box";
import {ChildrenInterface} from "../OrchestraLayer/ChildrenComponent";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import HomePage from "../UILayer/pages/Home/HomePage";
import NotFoundPage from "../UILayer/pages/Error/NotFoundPage";
import WidgetMainPage from "../UILayer/pages/Home/Widget/WidgetMainPage";
import ResponsiveAppBar from "../UILayer/components/ResponsiveAppbar";
import HomeLayout from "../UILayer/pages/Home/HomeLayout";
import LoginPage from "../UILayer/pages/Login/LoginPage";
import PersonPage from "../UILayer/pages/Home/Personal/PersonPage";
import AdminLayout from "../UILayer/pages/Admin/AdminLayout";
import BlogLayout from "../UILayer/pages/Blog/BlogLayout";




const RegisterPage = () => <div>Register Page</div>;


const ContactPage = () => <div>Contact Page</div>;
const ProfilePage = () => <div>Profile Page</div>;

const AdminDashboard = () => <div>Admin Dashboard</div>;
const CreateAccountPage = () => <div>Admin: Create Account</div>;
const ChangeUIPage = () => <div>Admin: Change UI</div>;
const ThemePage = () => <div>Admin: Theme</div>;
const BlogEditorPage = () => <div>Blog Editor</div>;
const BlogFindPage = () => <div>Find Blog Post</div>;
const BlogPostPage = () => <div>Viewing a Blog Post</div>;
const BlogDraftsPage = () => <div>Blog Drafts</div>;

const AppRouterLayer:React.FC<ChildrenInterface>=({children})=>{
  return (
    <Box>
    <Routes>
      {/* --- REDIRECT --- */}
      {/* Redirect from the root path to the home index page */}
      <Route path="/" element={<Navigate to="/home/index" replace />} />

      {/* --- AUTHENTICATION ROUTES --- */}
      {/* These are top-level routes without a shared layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* A logout route would typically be a function call that redirects, not a page */}

      {/* --- HOME ROUTES --- */}
      {/* All routes inside here will render within the <HomeLayout> component */}
      <Route path="/home" element={<HomeLayout />}>
        <Route path="index" element={<HomePage />} />
        <Route path="widget" element={<WidgetMainPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="personal" element={<PersonPage />} />
      </Route>

      {/* --- ADMIN ROUTES --- */}
      {/* All admin routes are nested under /admin and use the <AdminLayout> */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* You can have a default/index page for the admin section */}
        <Route index element={<AdminDashboard />} /> 
        <Route path="create-account" element={<CreateAccountPage />} />
        <Route path="change-ui" element={<ChangeUIPage />} />
        <Route path="theme" element={<ThemePage />} />
      </Route>

      {/* --- BLOG ROUTES --- */}
      {/* All blog routes are nested under /blog and use the <BlogLayout> */}
      <Route path="/blog" element={<BlogLayout />}>
        {/* The "write" route could have its own nested routes for different editor modes */}
        <Route path="write" element={<BlogEditorPage />}>
            {/* Example: /blog/write/page or /blog/write/diagram */}
            {/* These would require another <Outlet> in the BlogEditorPage component */}
        </Route>
        <Route path="find" element={<BlogFindPage />} />
        <Route path="drafts" element={<BlogDraftsPage />} />
        {/* Routes with parameters like :id */}
        <Route path="open/:id" element={<BlogPostPage />} />
        <Route path="edit/:id" element={<BlogEditorPage />} />
      </Route>
</Routes>
        {children}
    
</Box>
)
}
export default AppRouterLayer;


