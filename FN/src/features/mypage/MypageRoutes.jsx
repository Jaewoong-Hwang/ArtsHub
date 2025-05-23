import { Route } from 'react-router-dom';
import Userinfo from './pages/user/userinfo';
import Funding_history from './pages/user/funding_history';

export const MypageRoutes = () => (
  <>
    <Route path="/userinfo" element={<Userinfo />} />
    <Route path="/funding_history" element={<Funding_history />} />
  </>
);