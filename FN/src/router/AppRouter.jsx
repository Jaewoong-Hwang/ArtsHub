import { BrowserRouter, Routes } from 'react-router-dom';
import { ProjectRoutes } from '../features/project/projectRoutes';
import { StepModalProvider } from '../features/project/projectcreate/components/StepModalContext'; // ✅ 경로 확인
import { HomeRoutes } from '../features/Home/homeRoutes';
import { MypageRoutes } from '../features/mypage/mypageRoutes';
import { FundingRoutes } from '../features/funding/fundingRoutes';


export const AppRouter = () => (
  
    <BrowserRouter>
    <StepModalProvider> {/* ✅ 여기서 감싸야 useStepModal()이 작동합니다 */}
      <Routes>
        {ProjectRoutes()}
        {HomeRoutes()}
        {MypageRoutes()}
        {FundingRoutes()}
        {/* 나중에 필요 시 다른 Route도 추가 가능 */}
      </Routes>
      </StepModalProvider>
    </BrowserRouter>
  
);