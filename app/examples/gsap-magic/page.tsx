/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { 
  Maximize2, 
  Minimize2, 
  Cpu, 
  Terminal, 
  Database, 
  Network,
  ArrowRight,
  Activity,
  Scan,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

const NODES = [
  { id: "alpha", icon: Cpu, title: "CORE_PROCESSOR", color: "text-blue-500", border: "border-blue-500/20", bg: "bg-blue-500/5", desc: "Primary logic gate array. Orchestrating system-wide computational throughput with zero-latency overhead." },
  { id: "beta", icon: Database, title: "MEM_STORAGE", color: "text-emerald-500", border: "border-emerald-500/20", bg: "bg-emerald-500/5", desc: "Persistent quantum-encrypted storage. High-redundancy blocks distributed across the edge mesh." },
  { id: "gamma", icon: Network, title: "NEURAL_LINK", color: "text-purple-500", border: "border-purple-500/20", bg: "bg-purple-500/5", desc: "Bi-directional synapse bridges. Enabling real-time synchronization between disparate logic clusters." },
  { id: "delta", icon: Terminal, title: "SHELL_EXEC", color: "text-orange-500", border: "border-orange-500/20", bg: "bg-orange-500/5", desc: "Root-level command execution environment. Sandboxed for maximum security and protocol adherence." },
];

export default function GSAPMagicPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const flipState = useRef<any>(null);

  // 关键：在触发状态更新前，先捕获当前 DOM 状态
  const toggleNode = (id: string | null) => {
    // 1. 捕获 (First)
    flipState.current = Flip.getState(".flip-element", {
      props: "backgroundColor,borderColor,opacity",
      simple: true
    });
    
    // 2. 更新状态 (React 触发重新渲染，产生 Last 状态)
    setActiveId(id);
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;

    // 3. 执行翻转 (Invert & Play)
    const ctx = gsap.context(() => {
      Flip.from(flipState.current, {
        duration: 0.7,
        ease: "expo.inOut",
        stagger: 0.02,
        absolute: true, // 非常重要：防止布局抖动
        onComplete: () => {
          flipState.current = null;
        }
      });

      // 附加动画：当节点展开时，淡入详情
      if (activeId) {
        gsap.fromTo(".detail-reveal", 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.4, delay: 0.4 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeId]);

  // 入场动画处理全局 UI 元素
  useLayoutEffect(() => {
    const q = gsap.utils.selector(containerRef);
    gsap.fromTo(q(".ui-reveal"), 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-mono p-4 md:p-12 relative overflow-hidden">
      {/* 统一的蓝图背景 */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '128px 128px' }}></div>

      {/* 顶部 HUD */}
      <header className="ui-reveal relative z-10 flex justify-between items-start border-b border-border pb-8 mb-16">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 border border-primary/20">
              <Scan className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase">
              Flip_Layout_Morphing
            </h1>
          </div>
          <div className="text-[9px] uppercase tracking-[0.2em] opacity-40">Protocol: GSAP_FLIP_V3.15 // Status: Stable</div>
        </div>
        <div className="hidden md:flex gap-12 text-right uppercase">
          <div className="space-y-1">
            <div className="text-[8px] opacity-30">Current_Target</div>
            <div className="text-[10px] font-bold">{activeId ? `NODE_${activeId.toUpperCase()}` : "NONE"}</div>
          </div>
          <div className="space-y-1 text-primary">
            <Activity className="w-4 h-4 ml-auto animate-pulse" />
            <div className="text-[8px] font-bold tracking-tighter">DATA_SYNC_ON</div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto min-h-[600px]">
        
        {/* 交互说明 */}
        {!activeId && (
          <div className="ui-reveal text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-[10px] uppercase font-bold text-muted-foreground bg-muted/30">
              Select any system node to expand data
            </div>
          </div>
        )}

        {/* 动态布局区域 */}
        <div className="relative w-full h-full">
          
          {/* 网格视图容器 */}
          <div className={`grid gap-6 transition-all duration-700 ${activeId ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
            {NODES.map((node) => {
              const isActive = activeId === node.id;
              
              return (
                <div 
                  key={node.id}
                  data-flip-id={node.id} // Flip 识别的核心 ID
                  onClick={() => !isActive && toggleNode(node.id)}
                  className={`flip-element flex flex-col border-2 relative overflow-hidden group cursor-pointer
                    ${isActive ? `col-span-1 md:col-span-4 h-[500px] z-50 ${node.border} ${node.bg} shadow-2xl dark:shadow-none` : `aspect-square items-center justify-center p-6 border-border bg-muted/20 hover:border-primary/50`}
                  `}
                >
                  {/* 背景装饰文字 */}
                  {isActive && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-foreground/[0.02] uppercase pointer-events-none select-none">
                      {node.id}
                    </div>
                  )}

                  {/* 卡片头部内容 */}
                  <div className={`flex items-center gap-6 ${isActive ? 'p-10 border-b border-border w-full' : 'flex-col justify-center'}`}>
                    <div className={`p-4 transition-all duration-500 ${isActive ? 'bg-background border border-border' : 'bg-transparent'}`}>
                      <node.icon className={`transition-all duration-500 ${node.color} ${isActive ? 'w-12 h-12' : 'w-10 h-10'}`} />
                    </div>
                    
                    <div className={isActive ? 'space-y-1' : 'text-center'}>
                      <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-40">System_Object</div>
                      <h2 className={`font-black tracking-tighter uppercase ${isActive ? 'text-4xl' : 'text-xs'}`}>
                        {node.title}
                      </h2>
                    </div>

                    {isActive && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleNode(null); }}
                        className="ml-auto p-4 bg-background border border-border hover:bg-muted transition-all group"
                      >
                        <Minimize2 className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                      </button>
                    )}
                  </div>

                  {/* 详情区域 (仅在激活时渲染内容) */}
                  {isActive && (
                    <div className="flex-1 p-10 grid md:grid-cols-2 gap-12 items-start overflow-y-auto custom-scrollbar">
                      <div className="detail-reveal space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-primary tracking-widest">
                            <Activity className="w-4 h-4" /> Description_Trace
                          </div>
                          <p className="text-lg text-foreground/80 leading-relaxed font-sans border-l-2 border-border pl-6 italic">
                            &quot;{node.desc}&quot;
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Node_Metadata</div>
                          <div className="grid grid-cols-2 gap-px bg-border border border-border">
                             <div className="p-3 bg-background/50 text-[9px]">UPTIME: 142.5h</div>
                             <div className="p-3 bg-background/50 text-[9px]">LOAD: 12.4%</div>
                             <div className="p-3 bg-background/50 text-[9px]">THREAT: LOW</div>
                             <div className="p-3 bg-background/50 text-[9px]">VERSION: 4.1.2</div>
                          </div>
                        </div>
                      </div>

                      <div className="detail-reveal space-y-4 bg-background border border-border p-6 relative">
                        <div className="absolute top-0 right-0 p-3 opacity-10"><Terminal className="w-12 h-12" /></div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                           Live_Console_Output
                        </div>
                        <div className="text-[10px] leading-loose text-muted-foreground font-mono">
                          <div>$ sudo init handshake --target {node.id}</div>
                          <div className="text-primary">[SYSTEM] Attempting peer synchronization...</div>
                          <div className="text-primary">[SYSTEM] Sync established. Key length: 4096-bit</div>
                          <div className="text-green-500">[STATUS] Connection state: PERSISTENT</div>
                          <div className="text-muted-foreground/60 italic">_ waiting for user input...</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isActive && (
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <footer className="ui-reveal relative z-10 pt-16 flex justify-center">
        <Link href="/">
          <button className="px-10 py-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-90 transition-all cursor-pointer shadow-2xl">
            Abort_Session_And_Return
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </footer>
    </div>
  );
}
