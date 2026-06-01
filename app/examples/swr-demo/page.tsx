/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSafeSWR, useSafeSWRMutation } from "@/hooks/use-safe-swr";
import { 
  getArticlesApi, 
  createArticleApi, 
  ArticleListSchema, 
  CreateResponseSchema,
  ArticleSchema,
  Article
} from "./data";
import { Search, Plus, Send, RefreshCcw, AlertTriangle, CheckCircle2, Database, TerminalSquare, Activity, FileText } from "lucide-react";
import Link from "next/link";

export default function SWRDemoPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. 状态管理：筛选条件
  const [filters, setFilters] = useState({ search: "", category: "" });

  // 2. 使用 useSafeSWR 获取数据 (响应式)
  const { data: articles, isLoading, mutate, error } = useSafeSWR(
    ["/api/articles", filters], 
    ArticleListSchema,
    (key) => getArticlesApi(key[1])
  );

  // 3. 使用 useSafeSWRMutation 提交数据
  const InputSchema = ArticleSchema.omit({ id: true, createdAt: true });
  
  const { trigger: createArticle, isMutating: isSubmitting } = useSafeSWRMutation(
    "/api/articles",
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
      mutate();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message });
    }
  };

  // 入场动画
  useEffect(() => {
    const q = gsap.utils.selector(containerRef);
    const tl = gsap.timeline();

    tl.fromTo(q(".ui-reveal"), 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground font-mono p-4 md:p-12 relative overflow-hidden">
      {/* 工程网格背景 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]" 
           style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* 顶栏 Header */}
        <header className="ui-reveal flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-2 border-foreground pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-primary text-primary-foreground">
                <Database className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase">
                SWR_X_ZOD_PROTOCOL
              </h1>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest max-w-lg leading-relaxed">
              Demonstrating end-to-end type safety. Zod schema validation blocks malformed data at the network layer. Reactive SWR cache updates on mutation.
            </p>
          </div>
          <div className="text-right text-[10px] uppercase tracking-tighter hidden md:block">
            <div className="text-muted-foreground">STATUS</div>
            <div className="font-bold text-primary flex items-center justify-end gap-1">
              <Activity className="w-3 h-3 animate-pulse" /> NETWORK_ACTIVE
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* 左侧：数据注入终端 (Mutation) */}
          <section className="ui-reveal lg:col-span-5 space-y-6">
            <div className="bg-card border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] relative">
              {/* 终端头部 */}
              <div className="bg-foreground text-background p-3 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                  <TerminalSquare className="w-4 h-4 text-primary" />
                  Data_Injection_Terminal
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* 终端主体 */}
              <div className="p-6 space-y-6">
                <div className="text-[10px] text-muted-foreground uppercase italic">
                  &gt; Awaiting valid payload structure...
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Payload.Title [String]</label>
                    <input 
                      type="text"
                      className="w-full bg-muted/50 border border-input p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                      placeholder="Enter designation..." 
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Payload.Content [Text]</label>
                    <textarea 
                      className="w-full min-h-[120px] bg-muted/50 border border-input p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans resize-y"
                      placeholder="Input parameters..." 
                      value={form.content}
                      onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Payload.Class [Enum]</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-muted/50 border border-input p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none uppercase"
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))}
                      >
                        <option value="tech">Technology</option>
                        <option value="work">Operations</option>
                        <option value="life">Biological</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <ArrowDownIcon className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {msg && (
                  <div className={`p-3 text-[10px] uppercase font-bold tracking-widest flex items-start gap-2 border ${
                    msg.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
                  }`}>
                    {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                    <span className="whitespace-pre-wrap mt-0.5">{msg.text}</span>
                  </div>
                )}

                <button 
                  disabled={isSubmitting} 
                  onClick={handleSubmit}
                  className="w-full py-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <><RefreshCcw className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : (
                    <><Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Execute_Injection</>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* 右侧：实时数据流 (Reactive SWR) */}
          <section className="ui-reveal lg:col-span-7 space-y-6">
            
            {/* 过滤器 */}
            <div className="bg-card border border-border p-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="QUERY_DATABASE..." 
                  className="w-full bg-muted/50 border border-border py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-primary transition-colors uppercase placeholder:text-muted-foreground"
                  value={filters.search}
                  onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              <div className="sm:w-48 relative">
                 <select 
                  className="w-full bg-muted/50 border border-border py-2 px-3 text-xs focus:outline-none focus:border-primary transition-colors appearance-none uppercase"
                  value={filters.category}
                  onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">[ ALL_CLASSES ]</option>
                  <option value="tech">Technology</option>
                  <option value="work">Operations</option>
                  <option value="life">Biological</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <ArrowDownIcon className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
              <button 
                onClick={() => mutate()} 
                disabled={isLoading}
                className="w-10 h-10 shrink-0 bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors disabled:opacity-50"
                title="Force Cache Refresh"
              >
                <RefreshCcw className={`w-4 h-4 text-muted-foreground ${isLoading ? 'animate-spin text-primary' : ''}`} />
              </button>
            </div>

            {/* 数据列表 */}
            <div className="space-y-4">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <div className="h-px bg-border flex-1"></div>
                Live_Stream_Data
                <div className="h-px bg-border flex-1"></div>
              </div>

              {isLoading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-card border border-border p-6 space-y-4 opacity-50 animate-pulse">
                    <div className="h-4 bg-muted w-1/3"></div>
                    <div className="h-2 bg-muted/50 w-full"></div>
                    <div className="h-2 bg-muted/50 w-2/3"></div>
                  </div>
                ))
              ) : error ? (
                <div className="bg-destructive/10 border border-destructive/20 p-8 text-center space-y-4">
                  <AlertTriangle className="w-8 h-8 mx-auto text-destructive" />
                  <div className="text-xs font-bold text-destructive uppercase tracking-widest">Connection_Severed</div>
                  <p className="text-[10px] text-destructive font-sans">{error.message}</p>
                </div>
              ) : articles?.length === 0 ? (
                <div className="bg-muted/30 border border-border border-dashed p-12 text-center space-y-4">
                  <FileText className="w-8 h-8 mx-auto text-muted-foreground/30" />
                  <div className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">Empty_Record_Set</div>
                </div>
              ) : (
                articles?.map((article: Article) => (
                  <div key={article.id} className="bg-card border-l-4 border-l-primary border-y border-r border-border p-5 hover:border-r-muted-foreground/50 hover:border-y-muted-foreground/50 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-[8px] text-muted-foreground/30 opacity-50 group-hover:opacity-100 transition-opacity">
                      ID: {article.id.substring(0, 8)}
                    </div>
                    
                    <div className="flex justify-between items-start mb-3 pr-12">
                      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors font-sans">
                        {article.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-muted text-[9px] font-bold uppercase text-muted-foreground tracking-wider">
                        CLASS_{article.category}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed mb-4">
                      {article.content}
                    </p>
                    
                    <div className="flex justify-between items-center text-[9px] text-muted-foreground/50 uppercase tracking-widest border-t border-dashed border-border pt-3">
                      <span>Log_Time: {new Date(article.createdAt).toLocaleTimeString()}</span>
                      <span className="text-green-500 font-bold">Verified</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
        
        {/* 底部返回链接 */}
        <div className="ui-reveal pt-8 text-center">
           <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
              [ Terminate_Session ]
           </Link>
        </div>

      </div>
    </main>
  );
}

// 辅助图标组件
function ArrowDownIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}