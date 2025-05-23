import { BrowserRouter, Routes } from 'react-router-dom';
import { MypageRoutes } from '../features/mypage/MypageRoutes';
// import { FundingRoutes } from '../features/funding/FundingRoutes';
// import { ProjectRoutes } from '../features/project/ProjectRoutes';
// import { AdminRoutes } from '../features/admin/AdminRoutes';
// import { AuthRoutes } from '../features/auth/AuthRoutes';



export const AppRouter = () => (
  <BrowserRouter>
    <Routes>

      {MypageRoutes()}
      {/* {FundingRoutes()} */}
      {/* {ProjectRoutes()} */}
      {/* {ProjectRoutes()} */}
      {/* {AdminRoutes()} */}


    </Routes>
  </BrowserRouter>
);
