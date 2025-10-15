export interface SceneConfig {
  key: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  enabled: boolean;
}

export const SCENES: SceneConfig[] = [
  {
    key: 'chat',
    label: 'Chat',
    title: 'Chat',
    description: '企业级聊天 UI 组件与引擎，一键集成 Chat 体验',
    accent: '#4F8EF7',
    enabled: true,
  },
  {
    key: 'call',
    label: 'Call',
    title: 'Call',
    description: '音视频通话 UI 组件与引擎，支持一对一和多人通话场景',
    accent: '#10B981',
    enabled: true,
  },
  {
    key: 'live',
    label: 'Live',
    title: 'Live',
    description: '适用于社交娱乐、购物、健身等互动直播场景等 UI 组件与引擎，一键集成 Live 体验',
    accent: '#F59E0B',
    enabled: true,
  },
  {
    key: 'room',
    label: 'Room',
    title: 'Room',
    description: '多人会议 UI 组件与引擎，支持屏幕共享、白板协作等会议功能',
    accent: '#8B5CF6',
    enabled: true,
  },
];

export const getEnabledScenes = (): SceneConfig[] => SCENES.filter(scene => scene.enabled);

export const getSceneByKey = (key: string): SceneConfig | undefined => SCENES.find(scene => scene.key === key);

export const getDefaultScene = (): SceneConfig => getEnabledScenes()[0] || SCENES[0];

export const isSceneEnabled = (key: string): boolean => {
  const scene = getSceneByKey(key);
  return scene ? scene.enabled : false;
};
