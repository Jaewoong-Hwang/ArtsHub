import { BrowserRouter, Routes } from 'react-router-dom';
import { AdminRoutes } from '../features/admin/adminRoutes';


export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {AdminRoutes()}

    </Routes>
  </BrowserRouter>
);
