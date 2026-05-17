'use client';

import { useLayoutEffect, useEffect, useContext } from 'react';
import { UIStoreContext } from '@/store/use-ui-store';
import { writeUIStateCookie } from '@/lib/cookies';

/**
 * SyncUIState：负责将 Store 的变更同步到 Cookie 和 DOM
 */
export function SyncUIState() {
  const store = useContext(UIStoreContext);
  if (!store) throw new Error('SyncUIState must be used within UIStoreProvider');

  // 1. 响应式应用主题类到 HTML 标签（解决点击切换及系统设置实时变更）
  useLayoutEffect(() => {
    // 处理 DOM 类名切换的辅助函数
    const applyThemeToDOM = (theme: 'light' | 'dark' | 'system') => {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else if (theme === 'light') {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', isDark);
        root.style.colorScheme = isDark ? 'dark' : 'light';
      }
    };

    // a. 订阅 Store 中 theme 的变化 (用户手动点击切换)
    const unsubscribeStore = store.subscribe(
      (state) => state.theme,
      (theme) => applyThemeToDOM(theme)
    );

    // b. 订阅操作系统的偏好变化 (当用户选择了 system 时，实时响应系统切换)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (store.getState().theme === 'system') {
        applyThemeToDOM('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      unsubscribeStore();
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [store]);

  // 2. 客户端订阅：状态变化 → 写 Cookie（持久化）
  useEffect(() => {
    const unsubscribeStore = store.subscribe(
      (state) => ({ sidebarOpen: state.sidebarOpen, theme: state.theme }),
      (state) => {
        writeUIStateCookie(state);
      }
    );
    return unsubscribeStore;
  }, [store]);

  return null;
}
