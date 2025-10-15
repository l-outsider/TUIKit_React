import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLoginState } from '@tencentcloud/chat-uikit-react';
import { Button } from '@tencentcloud/uikit-base-component-react';
import Logo from '../../assets/RTCubeLogo.png';
import styles from './StagesPage.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { getEnabledScenes, getDefaultScene, isSceneEnabled } from '../../config/scenes';

function StagesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout: chatLogout } = useLoginState();
  const { logout: authLogout } = useAuth();
  
  const [currentKey, setCurrentKey] = useState<string>('chat');

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const sceneId = pathParts[2] || 'chat';
    const validSceneId = sceneId && isSceneEnabled(sceneId) ? sceneId : getDefaultScene().key;
    setCurrentKey(validSceneId);
  }, [location])
  
  const scenes = getEnabledScenes();

  function switchScene(key: string) {
    if (key === currentKey) {
      return;
    }
    setCurrentKey(key);
    navigate(`/stages/${key}`, { replace: true });
  }
  
  function logout() {
    chatLogout();
    authLogout();
    localStorage.removeItem('userInfo');
    navigate('/');
  }

  return (
    <div className={styles.stagePage}>
      <header className={styles.stageHeader}>
        <div className={styles.stageHeaderLeft}>
          <img
            src={Logo}
            alt="RTCube Logo"
            className={styles.stageHeaderLogo}
            onClick={() => navigate('/')}
          />
          {scenes.map((scene) => (
            <button
              key={scene.key}
              className={`${styles.pill} ${scene.key === currentKey ? styles.active : ''}`}
              onClick={() => switchScene(scene.key)}
            >
              {scene.label}
            </button>
          ))}
        </div>
        <div className={styles.stageHeaderRight}>
          <Button onClick={logout}>
            退出
          </Button>
        </div>
      </header>

      <div className={styles.stageContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default StagesPage;