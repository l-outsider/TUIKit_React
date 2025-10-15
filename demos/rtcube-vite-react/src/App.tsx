import { UIKitProvider } from '@tencentcloud/chat-uikit-react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { i18nInit } from './locales';
import { router } from './router';

i18nInit();

function App() {
  return (
    <UIKitProvider language="zh-CN" theme="light">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </UIKitProvider>
  );
}

export default App;
