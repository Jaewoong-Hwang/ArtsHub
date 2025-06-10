import { BrowserRouter, Routes } from 'react-router-dom';
import { ProjectRoutes } from '../features/project/projectRoutes';
import { StepModalProvider } from '../features/project/projectcreate/components/StepModalContext'; // ✅ 경로 확인
import { AuthRoutes } from '../features/auth/authRoutes';
import { HomeRoutes } from '../features/Home/homeRoutes';

export const AppRouter = () => (
  
    <BrowserRouter>
    <StepModalProvider> {/* ✅ 여기서 감싸야 useStepModal()이 작동합니다 */}
      <Routes>
        {ProjectRoutes()}
        {HomeRoutes()}
        {/* 나중에 필요 시 다른 Route도 추가 가능 */}
        {AuthRoutes()}
      </Routes>
      </StepModalProvider>
    </BrowserRouter>
  
);