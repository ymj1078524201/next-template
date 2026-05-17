import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, Zap, Database, ShieldCheck, Layout } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const examples = [
    {
      title: "SWR & Mutation 安全演示",
      description: "展示如何通过 Zod 锁死前后端数据流，实现极致的类型安全。",
      href: "/examples/swr-demo",
      icon: ShieldCheck,
      color: "text-blue-500",
      badge: "Recommended",
      badgeVariant: "default" as const,
    },
    {
      title: "部分预渲染 (PPR)",
      description: "混合静态外壳与动态流式传输，提供极致的首屏速度。",
      href: "/examples/ppr",
      icon: Zap,
      color: "text-yellow-500",
      badge: "Experimental",
      badgeVariant: "secondary" as const,
    },
    {
      title: "\"use cache\" 指令",
      description: "体验 Next.js 15+ 全新的服务器端异步函数缓存方案。",
      href: "/examples/cache-directive",
      icon: Database,
      color: "text-green-500",
      badge: "New",
      badgeVariant: "outline" as const,
    },
    {
      title: "Cache Components 实战",
      description: "深入理解如何利用服务器缓存优化复杂组件的渲染性能。",
      href: "/examples/cache-demo",
      icon: Layout,
      color: "text-purple-500",
      badge: "Advanced",
      badgeVariant: "outline" as const,
    },
  ];

  return (
    <main className="container max-w-5xl mx-auto py-12 px-4 space-y-12">
      {/* 标题区 */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
          Next.js 16 工程化模版
        </h1>
        <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
          探索 Next.js 最前沿的特性，构建高性能、全栈类型安全的现代应用。
        </p>
      </section>

      {/* 示例网格 */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Boxes className="w-6 h-6 text-primary" />
            功能示例库
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {examples.map((example) => (
            <Link key={example.href} href={example.href} className="group">
              <Card className="h-full transition-all group-hover:border-primary/50 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                      <example.icon className={`w-6 h-6 ${example.color}`} />
                    </div>
                    <Badge variant={example.badgeVariant}>{example.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {example.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {example.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 快速开始 */}
      <section className="bg-muted/50 border rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">准备好开始了吗？</h2>
          <p className="text-muted-foreground">
            本模板已经配置好了所有必要的工具和最佳实践。你可以直接在 <code>app/examples</code> 目录下参考现有的实现，并开始构建你自己的功能。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <code className="bg-background px-4 py-2 rounded-lg border font-mono text-sm">
              pnpm install
            </code>
            <code className="bg-background px-4 py-2 rounded-lg border font-mono text-sm">
              pnpm run dev
            </code>
          </div>
        </div>
      </section>
    </main>
  );
}
