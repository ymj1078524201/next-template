# Next.js 16 工程化模版 (Engineering Template)

这是一个专为中大型项目设计的 Next.js 16 模版，集成了最新的缓存特性、全栈类型安全校验、以及自动化脚手架工具。

## 🚀 核心特性

- **Next.js 16+**: 基于最新的 App Router 架构。
- **全栈类型安全**: 基于 **Zod** 的数据校验，锁死从 API 到 UI 的数据流。
- **状态管理**: 使用 **Zustand** + Context 模式，支持服务端初始化与首屏零闪烁。
- **主题系统**: 完美的 Dark Mode 支持，通过 `<ThemeScript />` 解决首屏 FOUC 问题。
- **UI 组件**: 基于 **shadcn/ui** (Tailwind CSS v4) 打造，高度可定制。
- **自动化脚本**: 提供一键生成 API、Hook 和 Error Boundary 的脚手架。

## 🛠️ 快速开始

### 方式 A：通过 npx 直接创建 (推荐)

无需手动克隆，直接使用 Next.js 官方工具初始化：

```bash
npx create-next-app@latest my-app --example https://github.com/ymj1078524201/next-template
```

### 方式 B：手动开发

```bash
git clone https://github.com/your-username/next-template
cd next-template
pnpm install
pnpm dev
```

## 🏗️ 如何基于此模版创建新功能

本模版提供了一系列脚本，帮助你快速遵循项目的工程化规范。

### 一键生成全栈 API (三位一体)

运行以下命令，会自动生成 **Zod Schema + SWR Hook + Mock API**：

```bash
pnpm run gen:api <feature-name>
```

**示例：**
```bash
pnpm run gen:api user-profile
```
这将在以下目录创建文件：
- `lib/validations/user-profile.ts` (校验逻辑)
- `hooks/use-user-profile.ts` (数据获取 Hook)
- `app/api/user-profile/route.ts` (Mock 接口)

### 一键生成局部错误边界

在任何路由目录下快速生成 `error.tsx`：

```bash
pnpm run gen:error ./app/dashboard
```

## 📂 目录结构规范

- `app/`: Next.js 16 路由，包含 `examples/` 示例库。
- `components/`:
  - `ui/`: 基础 shadcn/ui 组件。
  - `layout/`: 全局 Header, Sidebar 等布局组件。
- `lib/`:
  - `validations/`: Zod Schema 存放处。
  - `api-client.ts`: Axios 封装实例。
- `store/`: Zustand 全局状态定义。
- `hooks/`: 自定义 Hook，包含通用的 `use-safe-swr`。

## 🧪 性能分析

查看生产环境包体积：

```bash
pnpm run analyze
```

## 📖 最佳实践说明

1. **数据请求**: 始终优先使用 `useSafeSWR`，它强制要求传入 Zod Schema，确保数据在进入组件前是安全的。
2. **服务端组件**: 对于静态内容，尽量使用 Server Component；对于动态数据，使用 Suspense 包裹实现流式渲染。
3. **状态同步**: UI 相关的全局状态（如主题、侧边栏开关）会同步到 Cookie 中，确保 SSR 阶段能读取到正确值。
正确值。
