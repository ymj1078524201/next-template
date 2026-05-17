import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Zap, Clock, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * 这是一个演示 PPR (Partial Prerendering) 的页面。
 * 
 * 1. 静态外壳 (Static Shell): 标题、导航、说明文字在构建时生成。
 * 2. 动态洞口 (Dynamic Hole): 使用 Suspense 包裹的组件会在服务器端动态渲染并流式传输。
 */

// 模拟一个慢速的动态组件
async function DynamicDataComponent() {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const time = new Date().toLocaleTimeString();

  return (
    <div className="p-6 border-2 border-primary/20 rounded-xl bg-primary/5 animate-in fade-in slide-in-from-bottom-2 duration-1000">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/20 rounded-lg text-primary">
          <Clock className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold">这是动态数据</h3>
      </div>
      <p className="text-3xl font-mono font-bold tracking-tighter text-primary">
        {time}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        这个组件是动态渲染的，每次刷新页面都会更新。
      </p>
    </div>
  );
}

export default function PPRPage() {
  return (
    <main className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* 1. 静态部分 - 瞬间加载 */}
      <section className="space-y-4">
        <Link 
          href="/" 
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}
        >
          <ArrowLeft className="w-4 h-4" /> 返回首页
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">PPR (部分预渲染)</h1>
          <p className="text-xl text-muted-foreground">
            静态外壳 + 动态流，实现极速的首屏加载体验。
          </p>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="prose dark:prose-invert">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              为什么使用 PPR?
            </h2>
            <p className="text-muted-foreground">
              传统的 SSR 需要等待所有数据准备好才能发送 HTML。PPR 允许 Next.js 立即发送页面的静态部分（外壳），同时在服务器上并行执行动态组件。
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg flex gap-3 items-start">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="text-sm space-y-2">
              <p><strong>观察点：</strong></p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>刷新页面，你会发现标题和文字瞬间出现。</li>
                <li>右侧的组件会在 2 秒后平滑滑入。</li>
                <li>这就是“静态壳”和“动态内容”的无缝融合。</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. 动态部分 - 流式传输 */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">动态渲染区域</h2>
          <Suspense fallback={
            <div className="space-y-3">
              <Skeleton className="h-[120px] w-full rounded-xl" />
              <p className="text-xs text-center text-muted-foreground animate-pulse">
                正在服务器端生成动态内容...
              </p>
            </div>
          }>
            <DynamicDataComponent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
