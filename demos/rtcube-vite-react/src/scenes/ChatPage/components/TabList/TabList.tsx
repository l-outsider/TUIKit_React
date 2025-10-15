import styles from './TabList.module.scss';

export type TabKey = 'conversation' | 'contact';

interface TabListProps {
  activeTab: TabKey;
  labels?: Partial<Record<TabKey, string>>;
  onActiveTabChange?: (tab: TabKey) => void;
  onChange?: (tab: TabKey) => void;
}

function TabList({
  activeTab,
  labels,
  onActiveTabChange,
  onChange,
}: TabListProps) {
  const resolvedLabels = {
    conversation: labels?.conversation ?? '会话',
    contact: labels?.contact ?? '通讯录',
  };

  const onClick = (tab: TabKey) => {
    onActiveTabChange?.(tab);
    onChange?.(tab);
  };

  return (
    <div
      className={styles.tabNavigation}
      role="tablist"
      aria-label="聊天视图切换"
    >
      <button
        className={`${styles.tabButton} ${activeTab === 'conversation' ? styles.active : ''}`}
        role="tab"
        aria-selected={activeTab === 'conversation'}
        aria-label="切换到会话"
        onClick={() => onClick('conversation')}
      >
        {resolvedLabels.conversation}
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'contact' ? styles.active : ''}`}
        role="tab"
        aria-selected={activeTab === 'contact'}
        aria-label="切换到通讯录"
        onClick={() => onClick('contact')}
      >
        {resolvedLabels.contact}
      </button>
    </div>
  );
}

export default TabList;
