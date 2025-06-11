import { Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import AdminFunding from './pages/AdminFunding';
import AdminProject from './pages/AdminProject';
import AdminUser from './pages/AdminUser';


export const AdminRoutes = () => (
  <>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/funding" element={<AdminFunding />} />
    <Route path="/admin/project" element={<AdminProject />} />
    <Route path="/admin/user" element={<AdminUser />} />

  </>
);