import { Route } from 'react-router-dom';
import userinfo from './pages/user/userinfo';

export const AuthRoutes = () => (
  <>
    <Route path="/userinfo" element={<userinfo />} />
  </>
);