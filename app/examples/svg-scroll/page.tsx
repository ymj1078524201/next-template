"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Box, 
  Database, 
  Globe, 
  Lock, 
  Binary,
  ArrowRight,
  Settings2,
  Terminal
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);
}

export default function UniversalConstructorPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = gsap.utils.selector(containerRef);
    const ctx = gsap.context(() => {
      
      // 1. 初始入场动画
      gsap.fromTo(q(".header-content"), 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      // 同步处理全局定义的 ui-reveal 类（如果有使用）
      gsap.fromTo(q(".ui-reveal"), 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );

      // 2. 核心：滚动触发通用图标绘制
      // 遍历所有 .icon-module，为每个模块创建独立的滚动动画
      q(".icon-module").forEach((module) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: module,
            start: "top 80%", // 当模块顶部到达视口 80% 时触发
            end: "top 20%",
            toggleActions: "play reverse play reverse", // 来回滚动时重新绘制
          }
        });

        // 绘制图标内部所有路径
        tl.fromTo(module.querySelectorAll(".draw-target *"),
          { 
            drawSVG: 0, 
            opacity: 0 
          },
          { 
            drawSVG: "100%", 
            opacity: 1, 
            duration: 1.5, 
            stagger: {
              each: 0.1,
              from: "random" // 随机顺序生长，增加科技感
            },
            ease: "power2.inOut"
          }
        );

        // 联动标签动画
        tl.fromTo(module.querySelectorAll(".module-label"),
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
          "-=1"
        );
      });

      // 3. 背景齿轮旋转
      gsap.to(q(".bg-spinner"), {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const iconModules = [
    { icon: ShieldCheck, title: "Security_Protocol", desc: "Verifying encrypted payload structure." },
    { icon: Cpu, title: "Processing_Unit", desc: "Allocating core computing resources." },
    { icon: Database, title: "Storage_Matrix", desc: "Initializing persistent memory blocks." },
    { icon: Globe, title: "Network_Mesh", desc: "Establishing global synchronization." },
    { icon: Zap, title: "Energy_Vector", desc: "Routing power to primary sub-systems." },
    { icon: Lock, title: "Access_Control", desc: "Securing exposed API endpoints." },
    { icon: Box, title: "Component_Node", desc: "Mounting modular interface elements." },
    { icon: Binary, title: "Logic_Stream", desc: "Executing binary compilation sequence." },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-primary-foreground overflow-hidden relative">
      {/* 蓝图网格背景 */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08]" 
           style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]" 
           style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

      {/* 顶栏 HUD */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary rounded-sm">
            <Terminal className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-black text-foreground tracking-tighter uppercase leading-none">
              Universal_Drafting_Protocol
            </div>
            <div className="text-[9px] text-muted-foreground uppercase mt-1">Scroll_Sync_Enabled</div>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] text-right uppercase tracking-widest">
          <div>
            <div className="text-muted-foreground">Library</div>
            <div className="font-bold">Lucide-React</div>
          </div>
          <div>
            <div className="text-muted-foreground">Engine</div>
            <div className="font-bold text-primary">GSAP_DrawSVG</div>
          </div>
        </div>
      </header>

      <main className="relative pt-32 pb-24 px-4 md:px-12 max-w-6xl mx-auto space-y-32">
        
        {/* 头部展示 */}
        <section className="header-content text-center py-20 relative">
          <Settings2 className="bg-spinner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-muted/20 -z-10" strokeWidth={0.5} />
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
            Blueprint <br />
            <span className="text-primary italic">Materialization</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Scroll down to initiate the automated drafting sequence. Each component is traced dynamically using GSAP DrawSVG, validating the universal construction protocol across standard vector assets.
          </p>
        </section>

        {/* 滚动绘制模块列表 */}
        <div className="space-y-48">
          {iconModules.map((item, i) => {
            // 交替左右对齐
            const isEven = i % 2 === 0;
            return (
              <div key={i} className={`icon-module flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 relative`}>
                
                {/* 装饰连接线 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-border -z-10 hidden md:block"></div>

                {/* 左侧/右侧：图标展示区 */}
                <div className="w-48 h-48 shrink-0 bg-card border border-border shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.02)] flex items-center justify-center relative group">
                  <div className="absolute top-2 left-2 text-[8px] text-muted-foreground/50">SEC_{i + 1 < 10 ? `0${i + 1}` : i + 1}</div>
                  <div className="absolute bottom-2 right-2 text-[8px] text-muted-foreground/50">AUTO_TRACE</div>
                  
                  {/* 核心图标：带 draw-target 类名 */}
                  <item.icon className="draw-target w-20 h-20 text-primary" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
                </div>

                {/* 右侧/左侧：文本描述区 */}
                <div className={`flex-1 ${isEven ? 'text-left' : 'text-center md:text-right'}`}>
                  <div className="module-label inline-block px-3 py-1 bg-muted text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    Component_Scanned
                  </div>
                  <h2 className="module-label text-3xl font-black uppercase tracking-tight mb-4">
                    {item.title}
                  </h2>
                  <p className="module-label text-muted-foreground max-w-md leading-relaxed">
                    {item.desc}
                  </p>
                  
                  <div className="module-label flex items-center gap-4 mt-6 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">
                     <div className={`h-[1px] w-12 bg-border ${isEven ? '' : 'ml-auto'}`}></div>
                     <span>Path_Closed: 100%</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </main>

      {/* 底部导航 */}
      <footer className="relative border-t border-border bg-background/50 backdrop-blur-sm py-12 flex justify-center">
        <Link href="/">
          <button className="group px-8 py-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-90 transition-all cursor-pointer shadow-xl">
            Return_to_Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </Link>
      </footer>
    </div>
  );
}
