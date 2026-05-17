# 工程化最佳实践示例 (Examples)

这个目录存放了 Next.js 前端工程化中的高级特性示例。

## 1. 部分预渲染 (PPR) - `/examples/ppr`
演示如何结合 Next.js 16 的 PPR 特性，实现“静态外壳 + 动态流式传输”的极致体验。
*   **核心配置**: `next.config.ts` 中的 `experimental.ppr: 'incremental'`。
*   **适用场景**: 包含大量静态内容但核心数据需动态获取的页面（如产品详情页、个人主页）。

## 2. "use cache" 指令 - `/examples/cache-directive`
演示 Next.js 15+ 全新的异步函数缓存方案。
*   **核心指令**: 在异步函数顶部使用 `"use cache"`。
*   **适用场景**: 昂贵的 API 请求、复杂的计算逻辑、需要跨页面共享的服务器端数据。

## 3. Zod + TS 请求校验 - `/` (首页)
演示如何在发起客户端请求时，使用 Zod 在网络层进行 100% 的强类型校验。
*   **核心工具**: `lib/validations/`, `hooks/use-safe-swr.ts`。

---

*这些示例旨在展示如何平衡性能 (Performance) 与开发健壮性 (Robustness)。*
