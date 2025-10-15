import React from 'react';
import styles from './LivePage.module.scss';
import { useAuth } from '../../hooks/useAuth';

function LivePage() {
  const { isAuthenticated, userInfo } = useAuth();

  return (
    <div className={styles.LivePage}>
      <div className={styles.LivePage__header}>
        <h2>直播功能</h2>
        <div className={styles.LivePage__controls}>
          <button className={`${styles.LivePage__button} ${styles['LivePage__button--primary']}`}>
            开始直播
          </button>
          <button className={styles.LivePage__button}>
            设置
          </button>
        </div>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>🎥 直播间</h2>
        
        {isAuthenticated ? (
          <div>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              欢迎 {userInfo?.userID || userInfo?.userId || '用户'}！您可以开始直播或观看其他用户的直播。
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h3 style={{ marginBottom: '15px', color: '#333' }}>📹 开始直播</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  创建您的直播间，与观众实时互动
                </p>
                <button style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  开始直播
                </button>
              </div>
              
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h3 style={{ marginBottom: '15px', color: '#333' }}>👥 观看直播</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  浏览正在进行的直播，加入感兴趣的直播间
                </p>
                <button style={{
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  浏览直播
                </button>
              </div>
            </div>
            
            {/* 直播列表 */}
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>🔴 热门直播</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '15px'
              }}>
                {[
                  { title: '技术分享直播', host: '开发者小王', viewers: 128, status: 'live' },
                  { title: '游戏实况', host: '游戏达人', viewers: 256, status: 'live' },
                  { title: '音乐演奏', host: '音乐人', viewers: 89, status: 'live' }
                ].map((live, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '15px',
                      backgroundColor: '#fff',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px'
                    }}>
                      <span style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        🔴 LIVE
                      </span>
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        👥 {live.viewers}
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{live.title}</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                      主播: {live.host}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666'
          }}>
            <h3 style={{ marginBottom: '15px' }}>请先登录</h3>
            <p style={{ marginBottom: '20px' }}>
              登录后即可开始直播或观看其他用户的直播
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              立即登录
            </button>
          </div>
        )}
      </div>
      
      {/* 功能介绍 */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>直播功能特性</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {[
            '🎥 高清视频直播',
            '🎤 实时音频传输',
            '💬 弹幕互动',
            '👥 多人连麦',
            '🎁 礼物打赏',
            '📱 移动端支持',
            '🔒 隐私保护',
            '📊 数据统计'
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LivePage;