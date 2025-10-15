import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './RoomPage.module.scss';

interface Participant {
  id: string;
  name: string;
  isHost: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
}

function RoomPage() {
  const { userInfo } = useAuth();
  const [isInRoom, setIsInRoom] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants] = useState<Participant[]>([
    { id: '1', name: userInfo?.userID || '我', isHost: true, isMuted: false, isVideoOn: true },
    { id: '2', name: '张三', isHost: false, isMuted: false, isVideoOn: true },
    { id: '3', name: '李四', isHost: false, isMuted: true, isVideoOn: false },
    { id: '4', name: '王五', isHost: false, isMuted: false, isVideoOn: true },
  ]);

  const joinRoom = () => {
    setIsInRoom(true);
  };

  const leaveRoom = () => {
    setIsInRoom(false);
    setIsScreenSharing(false);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  if (isInRoom) {
    return (
      <div className={styles.roomPage}>
        <div className={styles.roomInterface}>
          <div className={styles.roomHeader}>
            <div className={styles.roomInfo}>
              <h2>🏢 会议室 - RTCube Demo</h2>
              <p>{participants.length} 位参与者</p>
            </div>
            <button className={styles.leaveBtn} onClick={leaveRoom}>
              离开会议
            </button>
          </div>

          <div className={styles.roomContent}>
            <div className={styles.mainArea}>
              {isScreenSharing ? (
                <div className={styles.screenShare}>
                  <div className={styles.screenPlaceholder}>
                    <span>🖥️ 屏幕共享中</span>
                    <p>正在共享 {userInfo?.userID || '用户'} 的屏幕</p>
                  </div>
                </div>
              ) : (
                <div className={styles.videoGrid}>
                  {participants.map((participant) => (
                    <div key={participant.id} className={styles.videoTile}>
                      <div className={styles.videoContent}>
                        {participant.isVideoOn ? (
                          <div className={styles.videoPlaceholder}>
                            📹 {participant.name}
                          </div>
                        ) : (
                          <div className={styles.avatarPlaceholder}>
                            👤 {participant.name}
                          </div>
                        )}
                      </div>
                      <div className={styles.participantInfo}>
                        <span className={styles.participantName}>
                          {participant.name}
                          {participant.isHost && ' (主持人)'}
                        </span>
                        <div className={styles.participantStatus}>
                          {participant.isMuted && <span className={styles.mutedIcon}>🔇</span>}
                          {!participant.isVideoOn && <span className={styles.videoOffIcon}>📹</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.sidebar}>
              <div className={styles.sidebarTabs}>
                <button className={`${styles.sidebarTab} ${styles.active}`}>
                  👥 参与者
                </button>
                <button className={styles.sidebarTab}>
                  💬 聊天
                </button>
                <button className={styles.sidebarTab}>
                  📝 白板
                </button>
              </div>
              
              <div className={styles.participantsList}>
                {participants.map((participant) => (
                  <div key={participant.id} className={styles.participantItem}>
                    <div className={styles.participantAvatar}>
                      👤
                    </div>
                    <div className={styles.participantDetails}>
                      <span className={styles.participantName}>
                        {participant.name}
                      </span>
                      {participant.isHost && (
                        <span className={styles.hostBadge}>主持人</span>
                      )}
                    </div>
                    <div className={styles.participantControls}>
                      {participant.isMuted ? '🔇' : '🎤'}
                      {participant.isVideoOn ? '📹' : '📷'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.roomControls}>
            <button className={styles.controlBtn}>
              🎤
            </button>
            <button className={styles.controlBtn}>
              📹
            </button>
            <button 
              className={`${styles.controlBtn} ${isScreenSharing ? styles.active : ''}`}
              onClick={toggleScreenShare}
            >
              🖥️
            </button>
            <button className={styles.controlBtn}>
              ✋
            </button>
            <button className={styles.controlBtn}>
              ⚙️
            </button>
            <button className={`${styles.controlBtn} ${styles.endCall}`} onClick={leaveRoom}>
              📞
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.roomPage}>
      <div className={styles.roomLobby}>
        <div className={styles.lobbyHeader}>
          <h2>🏢 多人会议</h2>
          <p>创建或加入会议室，开始协作</p>
        </div>

        <div className={styles.joinSection}>
          <div className={styles.joinCard}>
            <h3>🚀 快速加入</h3>
            <p>点击下方按钮加入演示会议室</p>
            <button className={styles.joinBtn} onClick={joinRoom}>
              加入会议室
            </button>
          </div>
        </div>

        <div className={styles.features}>
          <h3>🌟 会议功能特性</h3>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>👥</span>
              <div>
                <h4>多人视频</h4>
                <p>支持最多 300 人同时在线会议</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🖥️</span>
              <div>
                <h4>屏幕共享</h4>
                <p>高清屏幕共享，支持应用窗口选择</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>📝</span>
              <div>
                <h4>协作白板</h4>
                <p>实时协作白板，支持多人同时编辑</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💬</span>
              <div>
                <h4>会议聊天</h4>
                <p>会议内实时聊天，支持文件分享</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎥</span>
              <div>
                <h4>会议录制</h4>
                <p>云端录制会议内容，便于回顾</p>
              </div>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🔒</span>
              <div>
                <h4>安全保障</h4>
                <p>端到端加密，等候室安全控制</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomPage;