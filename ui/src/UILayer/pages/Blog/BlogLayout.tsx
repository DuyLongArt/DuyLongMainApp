import { Outlet } from "react-router-dom";

const BlogLayout:React.FC = () => (
  <div>
    <nav>Blog Navigation</nav>
    <hr />
    <Outlet />
  </div>
);

export default BlogLayout;