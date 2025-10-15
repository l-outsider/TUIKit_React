import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './CallPage.module.scss';

function CallPage() {
  const { userInfo } = useAuth();
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video'>('video');

  const startCall = (type: 'audio' | 'video') => {
    setCallType(type);
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
  };

  if (isInCall) {
    return (
      <div className={styles.callPage}>
        <div className={styles.callInterface}>
          <div className={styles.callHeader}>
            <h2>📞 {callType === 'video' ? '视频通话' : '语音通话'}中</h2>
            <p>与 {userInfo?.userID || '用户'} 的通话</p>
          </div>
          
          <div className={styles.callContent}>
            {callType === 'video' ? (
              <div className={styles.videoContainer}>
                <div className={styles.remoteVideo}>
                  <div className={styles.videoPlaceholder}>
                    <span>📹 远程视频</span>
                  </div>
                </div>
                <div className={styles.localVideo}>
                  <div className={styles.videoPlaceholder}>
                    <span>📷 本地视频</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.audioContainer}>
                <div className={styles.audioAvatar}>
                  <span>🎤</span>
                </div>
                <p>语音通话进行中...</p>
              </div>
            )}
          </div>

          <div className={styles.callControls}>
            <button className={styles.controlBtn} onClick={() => setCallType(callType === 'video' ? 'audio' : 'video')}>
              {callType === 'video' ? '📹' : '🎥'}
            </button>
            <button className={styles.controlBtn}>
              🎤
            </button>
            <button className={`${styles.controlBtn} ${styles.endCall}`} onClick={endCall}>
              📞
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.callPage}>
      <div className={styles.callLobby}>
        <div className={styles.lobbyHeader}>
          <h2>📞 音视频通话</h2>
          <p>选择通话类型开始体验</p>
        </div>

        <div className={styles.callOptions}>
          <div className={styles.callOption} onClick={() => startCall('audio')}>
            <div className={styles.optionIcon}>🎤</div>
            <h3>语音通话</h3>
            <p>高质量语音通话体验</p>
            <button className={styles.startBtn}>开始语音通话</button>
          </div>

          <div className={styles.callOption} onClick={() => startCall('video')}>
            <div className={styles.optionIcon}>📹</div>
            <h3>视频通话</h3>
            <p>面对面视频通话体验</p>
            <button className={styles.startBtn}>开始视频通话</button>
          </div>
        </div>

        <div className={styles.features}>
          <h3>🌟 通话功能特性</h3>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔊</span>
              <div>
                <h4>高清音质</h4>
                <p>48kHz 采样率，CD 级音质体验</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📱</span>
              <div>
                <h4>多端互通</h4>
                <p>支持 Web、iOS、Android 跨平台通话</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🛡️</span>
              <div>
                <h4>安全加密</h4>
                <p>端到端加密，保障通话隐私安全</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚡</span>
              <div>
                <h4>低延迟</h4>
                <p>全球部署，超低延迟通话体验</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallPage;