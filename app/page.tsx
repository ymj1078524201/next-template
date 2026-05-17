import { Suspense } from "react";
import { ModuleErrorBoundary } from "@/components/error/ModuleErrorBoundary";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, Terminal, Layout, Zap, Database, Boxes } from "lucide-react";
import Link from "next/link";
import { UserProfileServer } from "@/components/user-profile-server";
import { StateDemo } from "@/components/state-demo-client";

export default function DemoPage() {
  return (
    <main className="container max-w-5xl mx-auto py-12 px-4 space-y-12">
      {/* 标题区 */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
          前端工程化模版演示
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
          集成了 shadcn/ui, Zod, Axios, SWR, Zustand 以及 Next.js 16 最前沿的缓存特性。
        </p>
      </section>

      {/* 核心功能演示 */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            服务器组件 (Server Component)
          </h2>
          <ModuleErrorBoundary>
            <Suspense fallback={<Skeleton className="h-[250px] w-full rounded-xl" />}>
              <UserProfileServer id="user_123" />
            </Suspense>
          </ModuleErrorBoundary>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Layout className="w-6 h-6 text-blue-500" />
            全局状态管理 (Zustand)
          </h2>
          <StateDemo />
        </div>
      </div>

      {/* 高级特性示例 (Examples) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Boxes className="w-6 h-6 text-purple-500" />
          高级工程化示例 (Examples)
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/swr-demo" className="group">
            <Card className="h-full transition-all group-hover:border-blue-500/50 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <Badge variant="outline" className="text-blue-600 border-blue-200">Recommended</Badge>
                </div>
                <CardTitle>SWR & Mutation 安全演示</CardTitle>
                <CardDescription>
                  展示如何通过 Zod 锁死前后端数据流，实现极致的类型安全。
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/examples/ppr" className="group">
            <Card className="h-full transition-all group-hover:border-purple-500/50 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <Badge variant="outline" className="text-purple-600 border-purple-200">Experimental</Badge>
                </div>
                <CardTitle>部分预渲染 (PPR)</CardTitle>
                <CardDescription>
                  混合静态外壳与动态流式传输，提供极致的首屏速度。
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/examples/cache-directive" className="group">
            <Card className="h-full transition-all group-hover:border-green-500/50 group-hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-green-500" />
                  <Badge variant="outline" className="text-green-600 border-green-200">New</Badge>
                </div>
                <CardTitle>&quot;use cache&quot; 指令</CardTitle>
                <CardDescription>
                  体验 Next.js 15+ 全新的服务器端异步函数缓存方案。
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* 脚手架命令 */}
      <section className="p-8 bg-slate-900 rounded-2xl text-white space-y-6">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold">工程化脚手架命令</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Scaffolding</p>
            <div className="bg-black/50 p-3 rounded border border-white/10 font-mono text-sm">
              <span className="text-green-400">pnpm run gen:api</span> <span className="text-slate-400">user-profile</span>
            </div>
            <p className="text-xs text-slate-400">一键生成 Schema + Hook + Mock API</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Optimization</p>
            <div className="bg-black/50 p-3 rounded border border-white/10 font-mono text-sm">
              <span className="text-green-400">pnpm run analyze</span>
            </div>
            <p className="text-xs text-slate-400">分析生产构建的包体积分布</p>
          </div>
        </div>
      </section>
    </main>
  );
}
