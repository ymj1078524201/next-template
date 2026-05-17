/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSafeSWR, useSafeSWRMutation } from "@/hooks/use-safe-swr";
import { 
  getArticlesApi, 
  createArticleApi, 
  ArticleListSchema, 
  CreateResponseSchema,
  ArticleSchema,
  Article
} from "./data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Send, RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";

/**
 * Demo 场景：文章管理系统
 */
export default function SWRDemoPage() {
  // 1. 状态管理：筛选条件
  const [filters, setFilters] = useState({ search: "", category: "" });

  // 2. 使用 useSafeSWR 获取数据 (响应式)
  // 当 filters 改变时，SWR 自动触发重新请求
  const { data: articles, isLoading, mutate, error } = useSafeSWR(
    ["/api/articles", filters], 
    ArticleListSchema,
    (key) => getArticlesApi(key[1])
  );

  // 3. 使用 useSafeSWRMutation 提交数据
  // 我们为输入定义一个临时的 Schema 进行拦截校验
  const InputSchema = ArticleSchema.omit({ id: true, createdAt: true });
  
  const { trigger: createArticle, isMutating: isSubmitting } = useSafeSWRMutation(
    "/api/articles", // 关联到上面的 key，提交成功后方便刷新缓存
    CreateResponseSchema,
    createArticleApi,
    InputSchema
  );

  // 表单处理
  const [form, setForm] = useState({ title: "", content: "", category: "tech" as const });
  const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      const result = await createArticle(form);
      setMsg({ type: 'success', text: result.message });
      setForm({ title: "", content: "", category: "tech" });
      // 提交成功后，刷新列表缓存
      mutate();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message });
    }
  };

  return (
    <main className="container max-w-5xl mx-auto py-12 px-4 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">SWR & Mutation 安全模版演示</h1>
        <p className="text-muted-foreground text-lg">
          展示如何通过 Zod 锁死前后端数据流，实现极致的类型安全和响应式体验。
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* 左侧：发布表单 (Mutation) */}
        <section className="space-y-6">
          <Card className="border-2 border-primary/10 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" /> 发布新文章
              </CardTitle>
              <CardDescription>提交数据前，前端会自动进行 Zod 校验</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">文章标题</label>
                <Input 
                  placeholder="输入标题..." 
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">文章内容</label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="输入内容..." 
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">分类</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))}
                >
                  <option value="tech">科技</option>
                  <option value="work">工作</option>
                  <option value="life">生活</option>
                </select>
              </div>

              {msg && (
                <div className={`p-3 rounded-lg flex items-start gap-2 text-sm ${
                  msg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 mt-0.5" /> : <AlertTriangle className="w-4 h-4 mt-0.5" />}
                  <span className="whitespace-pre-wrap">{msg.text}</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                立即发布
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* 右侧：文章列表 (Reactive SWR) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-medium flex items-center gap-2">
                <Search className="w-4 h-4" /> 搜索文章
              </label>
              <Input 
                placeholder="搜索标题..." 
                value={filters.search}
                onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <div className="w-full sm:w-40 space-y-2">
              <label className="text-sm font-medium">分类过滤</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={filters.category}
                onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">全部</option>
                <option value="tech">科技</option>
                <option value="work">工作</option>
                <option value="life">生活</option>
              </select>
            </div>
            <Button variant="outline" onClick={() => mutate()} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              [1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
            ) : error ? (
              <div className="p-8 border-2 border-dashed rounded-2xl text-center space-y-2">
                <AlertTriangle className="w-10 h-10 mx-auto text-red-500" />
                <h3 className="text-lg font-bold">加载失败</h3>
                <p className="text-muted-foreground">{error.message}</p>
              </div>
            ) : articles?.length === 0 ? (
              <div className="p-12 border-2 border-dashed rounded-2xl text-center space-y-2">
                <Search className="w-10 h-10 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">没有找到匹配的文章</p>
              </div>
            ) : (
              articles?.map((article: Article) => (
                <Card key={article.id} className="group hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-muted-foreground line-clamp-2">{article.content}</p>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground">
                    发布于 {new Date(article.createdAt).toLocaleString()}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
