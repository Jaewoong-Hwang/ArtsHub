import React from 'react';
import { AppRouter } from './router/AppRouter';
import { StepModalProvider } from './features/project/projectcreate/components/StepModalContext'; // ✅ import 추가
// 로그인 상태 전역 관리 Provider
import { AuthProvider } from './features/auth/context/AuthContext'; // 경로 확인

function App() {
  return (
    <StepModalProvider> {/* ✅ Context로 전체 앱 감싸기 */}
      <AuthProvider> {/*  로그인 상태 전역 제공 */}
      <div className="App">
        <AppRouter />
      </div>
      </AuthProvider>
    </StepModalProvider>
  );
}

export default App;