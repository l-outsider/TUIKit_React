import React from 'react';
import { Login } from '@tencentcloud/uikit-base-widget-react';
import { useLoginState } from '@tencentcloud/chat-uikit-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './LoginPage.module.scss';
import { Toast } from '@tencentcloud/uikit-base-component-react';

function LoginPage() {
  const navigate = useNavigate();
  const { sceneId } = useParams();
  const { login: chatLogin } = useLoginState();
  const { login: authLogin } = useAuth();
  
  const handleLoginCallback = (userInfo: any) => {
    const { SDKAppID, userID, userSig } = userInfo;
    chatLogin({
      SDKAppID,
      userID,
      userSig,
    }).then(() => {
      authLogin(userInfo);
      const targetPath = `/stages/${sceneId || 'chat'}`;
      navigate(targetPath, { replace: true });
      
    }).catch((error) => {
      console.error('Login failed:', error);
      Toast({
        message: '登录失败，请重试'
      });
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>欢迎回来</h1>
          <p className={styles.loginSubtitle}>
            登录您的账户，开始使用 RTCube 的强大功能
          </p>
        </div>
        <div className={styles.loginWrapper}>
          <Login SDKAppID={1400187352} onLoginCallback={handleLoginCallback} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;