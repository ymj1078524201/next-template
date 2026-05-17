const COOKIE_KEY = 'ui-state';
const MAX_AGE = 60 * 60 * 24 * 365; // 1年

export interface UICookieState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
}

// 与 store 初始值保持一致，作为 Cookie 缺失时的兜底
export const DEFAULT_UI_STATE: UICookieState = {
  sidebarOpen: true,
  theme: 'system',
};

/**
 * 服务端用：解析 Cookie 字符串 → 状态对象
 * 纯函数，不依赖任何浏览器/Next.js API，易于测试
 */
export function parseUICookie(cookieValue: string | undefined): UICookieState {
  if (!cookieValue) return DEFAULT_UI_STATE;
  try {
    const parsed = JSON.parse(cookieValue);
    // spread 确保 Cookie 字段残缺时有兜底
    return { ...DEFAULT_UI_STATE, ...parsed };
  } catch {
    return DEFAULT_UI_STATE;
  }
}

/**
 * 客户端用：将状态写入 Cookie
 * typeof document 守卫：模块被服务端 import 时安全，不会报错
 */
export function writeUIStateCookie(state: UICookieState): void {
  if (typeof document === 'undefined') return;
  document.cookie = [
    `${COOKIE_KEY}=${JSON.stringify(state)}`,
    'path=/',
    `max-age=${MAX_AGE}`,
    'SameSite=Lax',
  ].join('; ');
}
