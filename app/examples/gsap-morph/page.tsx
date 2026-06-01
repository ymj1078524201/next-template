"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { 
  RefreshCcw, 
  ShieldCheck, 
  Zap, 
  Hexagon, 
  Square,
  Circle,
  ArrowRight,
  Activity,
  Cpu
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin);
}

const SHAPES = {
  // 基础六角形 (Idle/Ready)
  idle: "M200,100 L373,200 L373,400 L200,500 L27,400 L27,200 Z",
  // 盾牌形状 (Protected)
  secure: "M50,100 C50,100 200,50 200,50 C200,50 350,100 350,100 C350,100 350,300 350,300 C350,450 200,550 200,550 C200,550 50,450 50,300 C50,300 50,100 50,100 Z",
  // 警告三角形 (Warning)
  alert: "M200,50 L380,450 L20,450 Z",
  // 精密芯片/正方形 (Processing)
  process: "M100,100 L300,100 L300,300 L100,300 Z"
};

export default function GSAPMorphPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentType, setCurrentType] = useState<keyof typeof SHAPES>("idle");

  useEffect(() => {
    const q = gsap.utils.selector(containerRef);
    
    // 初始入场
    gsap.fromTo(q(".ui-reveal"), 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const handleMorph = (type: keyof typeof SHAPES) => {
    if (type === currentType) return;
    
    setCurrentType(type);
    
    // 执行 Morph 魔法
    gsap.to("#morph-target", {
      morphSVG: SHAPES[type],
      duration: 1.2,
      ease: "elastic.out(1, 0.6)", // 使用弹性缓动增加物理质感
      onStart: () => {
        // 联动：标题和背景光效
        gsap.fromTo(".status-text", 
          { opacity: 0, x: -10 }, 
          { opacity: 1, x: 0, duration: 0.4 }
        );
      }
    });

    // 联动图标变色
    const colors = {
      idle: "var(--primary)",    // blue
      secure: "#10b981",         // emerald
      alert: "var(--destructive)", // red
      process: "#f59e0b"         // amber
    };
    
    gsap.to("#morph-target", {
      stroke: colors[type],
      duration: 0.8
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-mono p-4 md:p-12 relative overflow-hidden flex flex-col items-center">
      {/* 蓝图背景 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <header className="ui-reveal w-full max-w-5xl flex justify-between items-center mb-16 border-b border-border pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 border border-primary/20">
              <RefreshCcw className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase">
              Morph_Path_Protocol
            </h1>
          </div>
          <div className="text-[8px] tracking-[0.4em] text-muted-foreground uppercase">Shape_Reconstruction_Engine_v1.0</div>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] text-right uppercase">
           <div><span className="opacity-30">Status:</span> <span className="text-green-500 font-bold">STABLE</span></div>
           <div><span className="opacity-30">Plugin:</span> <span className="text-primary font-bold">MorphSVG</span></div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
        
        {/* 左侧：Morph 控制台 */}
        <div className="ui-reveal w-full md:w-80 space-y-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-l-2 border-primary pl-4 mb-8">
            Select_Target_Geometry
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {(Object.keys(SHAPES) as Array<keyof typeof SHAPES>).map((shape) => (
              <button
                key={shape}
                onClick={() => handleMorph(shape)}
                className={`p-4 border text-left flex items-center justify-between transition-all group cursor-pointer ${currentType === shape ? 'bg-foreground text-background border-foreground' : 'border-border bg-muted/20 hover:border-primary/50'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-[10px] font-black uppercase ${currentType === shape ? '' : 'text-muted-foreground'}`}>{shape}</div>
                </div>
                <div className={`text-[8px] font-bold opacity-40 group-hover:opacity-100 transition-opacity`}>
                  {currentType === shape ? "ACTIVE" : "READY"}
                </div>
              </button>
            ))}
          </div>

          {/* 实时状态面板 */}
          <div className="mt-12 p-6 bg-card border border-border space-y-4">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                <Activity className="w-3 h-3 animate-pulse" /> Live_Telemetry
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[9px]">
                   <span>MORP_PRECISION</span>
                   <span className="font-bold">99.98%</span>
                </div>
                <div className="h-1 bg-muted w-full overflow-hidden">
                   <div className="h-full bg-primary w-[99.98%] shadow-[0_0_10px_var(--primary)]"></div>
                </div>
             </div>
             <div className="status-text text-[9px] text-primary uppercase italic">
                {">"} Transitioning to {currentType.toUpperCase()}...
             </div>
          </div>
        </div>

        {/* 右侧：SVG Morph 主舞台 */}
        <div className="ui-reveal flex-1 relative flex items-center justify-center p-12 bg-card border border-dashed border-border min-h-[500px]">
           {/* 背景装饰 */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-border/10 rounded-full"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-border/20 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>

           {/* 核心 SVG */}
           <svg viewBox="0 0 400 600" className="w-full h-full max-w-[400px] drop-shadow-[0_0_40px_rgba(var(--primary),0.1)]">
              <path
                id="morph-target"
                className="fill-none stroke-primary stroke-[3]"
                d={SHAPES.idle}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* 装饰性细节（随 Morph 移动） */}
              <circle cx="200" cy="300" r="4" className="fill-foreground opacity-20" />
           </svg>

           {/* 四角 HUD */}
           <div className="absolute top-4 left-4 text-[8px] text-muted-foreground/30">COORD_X: 400</div>
           <div className="absolute top-4 right-4 text-[8px] text-muted-foreground/30">COORD_Y: 600</div>
           <div className="absolute bottom-4 left-4 text-[8px] text-muted-foreground/30">RENDER: VECTOR_PATH</div>
           <div className="absolute bottom-4 right-4 text-[8px] text-muted-foreground/30">LAYER: L_CORE_01</div>
        </div>

      </main>

      <footer className="ui-reveal w-full max-w-5xl pt-12 flex justify-between items-center border-t border-border mt-auto">
        <Link href="/">
          <button className="px-8 py-3 border border-border text-[10px] font-black uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all cursor-pointer">
             Return_Home
          </button>
        </Link>
        <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest text-muted-foreground">
           <Cpu className="w-4 h-4" />
           MorphSVG_Engine_Standby
        </div>
      </footer>
    </div>
  );
}
