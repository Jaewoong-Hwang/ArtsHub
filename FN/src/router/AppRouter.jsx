import { BrowserRouter, Routes } from 'react-router-dom';
import { MypageRoutes } from '../features/mypage/MypageRoutes';


export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {MypageRoutes()}

    </Routes>
  </BrowserRouter>
);
