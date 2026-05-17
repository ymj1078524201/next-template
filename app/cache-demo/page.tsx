import { Suspense } from "react";
import { UserProfileServer } from "@/components/user-profile-server";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal, Zap, Layers, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CacheDemoPage() {
  return (
    <main className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
      {/* 标题区 - 静态部分 (Instant) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3 h-3" />
          Next.js 16 Cache Components 演示
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          部分预渲染 (PPR) 实例
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          这个页面演示了如何混合静态外壳和缓存的服务器组件，提供极致的用户体验。
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {/* 左侧：原理说明 - 静态部分 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Layers className="w-6 h-6" />
            PPR 工作原理
          </h2>
          
          <div className="space-y-4">
            {[
              { 
                title: "静态外壳 (Shell)", 
                desc: "页面的标题、布局和说明文字是静态的，构建时生成，CDN 瞬间下发。", 
                icon: Zap 
              },
              { 
                title: "'use cache' 数据", 
                desc: "右侧的用户信息使用服务器端缓存，数据在服务器上预填，无需客户端发起 API 请求。", 
                icon: RefreshCcw 
              },
              { 
                title: "无感流式传输", 
                desc: "如果数据还在获取，Suspense 占位符会先显示，数据就绪后自动替换。", 
                icon: Terminal 
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 border rounded-lg bg-card shadow-sm">
                <div className="p-2 bg-blue-500/10 rounded-full h-fit">
                  <item.icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button>
              <Link href="/">返回普通 SWR 演示</Link>
            </Button>
          </div>
        </div>

        {/* 右侧：实战演示 - 缓存/动态部分 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">服务器缓存演示</h2>
          
          {/* 使用 Suspense 包裹服务器组件 */}
          <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}>
            <UserProfileServer id="user_123" />
          </Suspense>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg space-y-2">
            <p className="text-xs font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider">
              技术解析
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              打开浏览器网络面板，你会发现没有针对 <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded">/api/user</code> 的请求。数据已经作为 HTML 的一部分（或流式数据）直接从服务器下发。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
