import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnabledScenes } from '../../config/scenes';
import { useAuth } from '../../hooks/useAuth';
import styles from './HomePage.module.scss';

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const products = getEnabledScenes();

  function goStages(sceneId: string) {
    if (isAuthenticated) {
      navigate(`/stages/${sceneId}`);
    } else {
      navigate(`/login/${sceneId}`);
    }
  }

  return (
    <div className={styles.home}>
      <header className={styles.hero}>
        <div className={styles.brand}>
          RTCube
        </div>
        <h1 className={styles.headline}>
          下一代实时互动体验
        </h1>
        <p className={styles.sub}>
          用 RTCube 组件 搭建高端 Demo · 开箱即用
        </p>
      </header>

      <section className={styles.grid}>
        {products.map(item => (
          <article
            key={item.key}
            className={styles.card}
            style={{ '--accent': item.accent } as React.CSSProperties}
          >
            <div className={styles.badge} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button className={styles.enter} onClick={() => goStages(item.key)}>
              进入体验
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
