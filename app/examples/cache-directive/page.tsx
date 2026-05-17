import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Database, RefreshCw, ShieldCheck, ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * 这是一个演示 Next.js 15/16 新的 "use cache" 指令的页面。
 * 
 * "use cache" 是一个实验性功能，允许你将异步函数的结果直接持久化在服务器内存中。
 */

// 使用 "use cache" 缓存这个数据获取函数
async function getCachedData() {
  "use cache";
  // 设置缓存标签
  // (注意: 在某些版本中 cacheTag 是通过 API 调用的，这里展示核心理念)
  
  // 模拟一个非常昂贵的数据库查询
  console.log("[Server] 正在执行昂贵的数据库查询...");
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  return {
    value: Math.floor(Math.random() * 1000),
    fetchedAt: new Date().toLocaleTimeString(),
  };
}

async function CachedComponent() {
  const data = await getCachedData();

  return (
    <div className="p-6 border-2 border-green-500/20 rounded-xl bg-green-500/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-green-600" />
          <span className="font-bold text-green-700">已缓存数据</span>
        </div>
        <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full font-bold">
          use cache
        </span>
      </div>
      
      <div className="text-center py-4">
        <p className="text-4xl font-black text-green-600 tracking-tighter">
          {data.value}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          获取时间: {data.fetchedAt}
        </p>
      </div>

      <p className="text-xs text-green-700/70 italic">
        提示：刷新页面，你会发现随机数不再改变。这是因为该函数结果已被服务器持久化。
      </p>
    </div>
  );
}

export default function CacheDirectivePage() {
  return (
    <main className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
      <section className="space-y-4">
        <Link 
          href="/" 
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}
        >
          <ArrowLeft className="w-4 h-4" /> 返回首页
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">&quot;use cache&quot; 指令</h1>
          <p className="text-xl text-muted-foreground">
            Next.js 15+ 全新的服务器端持久化缓存方案。
          </p>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="prose dark:prose-invert">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              缓存的新范式
            </h2>
            <p className="text-muted-foreground">
              以前我们需要使用 <code className="px-1 rounded bg-muted">unstable_cache</code>。现在，只需在函数顶部加上 <code className="px-1 rounded bg-muted">&quot;use cache&quot;</code>，Next.js 就会自动处理缓存。
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 border rounded-lg bg-card">
              <div className="p-2 bg-green-500/10 rounded-full h-fit">
                <RefreshCw className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">自动持久化</h3>
                <p className="text-sm text-muted-foreground">函数返回值被存储在服务器内存或指定的缓存适配器中。</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">缓存效果演示</h2>
          <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-xl" />}>
            <CachedComponent />
          </Suspense>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg flex gap-3">
            <Info className="w-5 h-5 text-amber-500 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300">
              <strong>注意：</strong> 该功能目前处于实验阶段 (Experimental)。它允许比传统数据缓存更细粒度的控制。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
