import React from 'react';
import { AppRouter } from './router/AppRouter';
import { StepModalProvider } from './features/project/projectcreate/components/StepModalContext'; // ✅ import 추가

function App() {
  return (
    <StepModalProvider> {/* ✅ Context로 전체 앱 감싸기 */}
      <div className="App">
        <AppRouter />
      </div>
    </StepModalProvider>
  );
}

export default App;