import { Outlet } from "react-router-dom";

const AdminLayout :React.FC= () => (
  <div>
    <nav>Admin Navigation</nav>
    <hr />
    <Outlet />
  </div>
);
export default AdminLayout;