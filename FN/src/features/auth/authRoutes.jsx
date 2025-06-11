// authRoutes.jsx
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Join from './pages/Join';
import Main from './pages/Main';

export const AuthRoutes = () => (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/join" element={<Join />} />
    <Route path="/main" element={<Main />} />
  </>
);
