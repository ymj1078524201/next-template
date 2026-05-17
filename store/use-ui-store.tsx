"use client"

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createContext, useContext, useState } from 'react';
import type { UICookieState } from '@/lib/cookies';

/**
 * UI 状态 Store 类型定义
 */
interface UIState extends UICookieState {
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

type UIStore = ReturnType<typeof createUIStore>;

export const createUIStore = (initialState: UICookieState) => {
  return create<UIState>()(
    subscribeWithSelector((set) => ({
      ...initialState,
      
      // Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebar: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
    }))
  );
};

// 使用 React Context 来传递这个 Store 实例，避免全局单例导致的水合问题
export const UIStoreContext = createContext<UIStore | null>(null);

export function UIStoreProvider({ 
  children, 
  initialState 
}: { 
  children: React.ReactNode; 
  initialState: UICookieState;
}) {
  const [store] = useState(() => createUIStore(initialState));

  return (
    <UIStoreContext value={store}>
      {children}
    </UIStoreContext>
  );
}

export function useUIStore<T = UIState>(selector?: (state: UIState) => T): T {
  const store = useContext(UIStoreContext);
  if (!store) throw new Error('useUIStore must be used within UIStoreProvider');
  // @ts-expect-error - Zustand hooks support being called with or without a selector
  return store(selector);
}

// 给非 React 环境（如 StoreInitializer 的订阅逻辑）使用的后门
export const getUIStore = (context: UIStore | null) => {
  if (!context) throw new Error('Store not initialized');
  return context;
}
