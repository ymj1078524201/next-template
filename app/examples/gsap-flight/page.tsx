"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { 
  Plane, 
  Wind, 
  Zap, 
  Settings, 
  ArrowRight,
  Activity,
  Navigation,
  Compass,
  Cpu,
  Unplug,
  ShieldCheck,
  ChevronRight,
  RefreshCcw
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin);
}

const FLIGHT_MODES = {
  // 1. 巡航模式：宽大的双翼，平稳的外形
  cruise: "M200,50 L220,150 L380,250 L220,300 L210,450 L190,450 L180,300 L20,250 L180,150 Z",
  // 2. 超音速模式：后掠翼，尖锐的机头，紧凑结构
  supersonic: "M200,20 L215,200 L320,400 L200,380 L80,400 L185,200 Z",
  // 3. 侦察机/无人机：X型翼，独特的几何感
  drone: "M150,150 L250,150 L400,50 L400,450 L250,350 L150,350 L0,450 L0,50 Z"
};

export default function GSAPFlightMorphPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<keyof typeof FLIGHT_MODES>("cruise");
  const isTransitioning = useRef(false);

  // 初始入场动画
  useEffect(() => {
    const q = gsap.utils.selector(containerRef);
    const tl = gsap.timeline();
    
    tl.fromTo(q(".ui-reveal"), 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const handleModeSwitch = (mode: keyof typeof FLIGHT_MODES) => {
    if (mode === activeMode || isTransitioning.current) return;
    
    isTransitioning.current = true;
    setActiveMode(mode);

    // 核心 Morph 魔法
    // 强制选中 DOM 节点进行操作
    gsap.to("#aircraft-path", {
      morphSVG: FLIGHT_MODES[mode],
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        isTransitioning.current = false;
      }
    });

    // 联动 1: 遥测面板闪烁
    gsap.fromTo(".telemetry-node", 
      { opacity: 0.2 }, 
      { opacity: 1, duration: 0.1, repeat: 5, yoyo: true }
    );

    // 联动 2: 背景光圈颜色渐变
    const colors = {
      cruise: "rgba(59, 130, 246, 0.4)",      // Blue
      supersonic: "rgba(239, 68, 68, 0.4)",  // Red
      drone: "rgba(168, 85, 247, 0.4)"       // Purple
    };
    
    gsap.to(".glow-aura", {
      backgroundColor: colors[mode],
      duration: 1.2
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-mono p-4 md:p-12 relative overflow-hidden flex flex-col items-center">
      
      {/* 蓝图网格背景 (与首页风格统一) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

      {/* 动态氛围发光 */}
      <div className="glow-aura absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.08] pointer-events-none transition-colors duration-1000"></div>

      {/* 顶栏 HUD */}
      <header className="ui-reveal w-full max-w-6xl flex justify-between items-center mb-16 border-b-2 border-foreground pb-8 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary text-primary-foreground rounded-sm">
              <Plane className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase">
              Flight_Morph_Protocol
            </h1>
          </div>
          <div className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-bold">Aero_Dynamics_Module // Variable_Geometry_v2</div>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] text-right uppercase tracking-widest">
           <div className="space-y-1">
              <div className="text-muted-foreground">Status</div>
              <div className="font-bold text-primary flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                RECONFIG_READY
              </div>
           </div>
           <div className="space-y-1">
              <div className="text-muted-foreground">Mode</div>
              <div className="font-bold">{activeMode.toUpperCase()}</div>
           </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* 左侧：控制台 */}
        <div className="ui-reveal lg:col-span-4 space-y-6">
          <div className="bg-card border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
             <div className="bg-foreground text-background p-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" /> Configuration_Manager
             </div>
             <div className="p-6 space-y-4">
                {(Object.keys(FLIGHT_MODES) as Array<keyof typeof FLIGHT_MODES>).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleModeSwitch(mode)}
                    className={`w-full p-4 border-2 text-left transition-all flex justify-between items-center group cursor-pointer ${activeMode === mode ? 'bg-foreground text-background border-foreground' : 'bg-muted/30 border-border hover:border-primary/50'}`}
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-tight">{mode}</div>
                      <div className={`text-[8px] uppercase mt-1 ${activeMode === mode ? 'opacity-60' : 'text-muted-foreground'}`}>
                        {mode === 'cruise' ? 'MAX_EFFICIENCY' : mode === 'supersonic' ? 'MAX_VELOCITY' : 'MAX_STEALTH'}
                      </div>
                    </div>
                    {activeMode === mode ? (
                      <ChevronRight className="w-4 h-4 text-primary" />
                    ) : (
                      <RefreshCcw className="w-3 h-3 text-muted-foreground group-hover:text-foreground group-hover:rotate-180 transition-all duration-500" />
                    )}
                  </button>
                ))}
             </div>
          </div>

          <div className="telemetry-node p-6 bg-card border border-border space-y-6">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                <Activity className="w-3 h-3 text-primary" /> Live_Telemetry
             </div>
             <div className="space-y-4">
                <div className="space-y-1">
                   <div className="flex justify-between text-[9px] font-bold"><span>VELOCITY_MACH</span><span>{activeMode === 'supersonic' ? '3.2' : '0.8'}</span></div>
                   <div className="h-1.5 bg-muted overflow-hidden"><div className={`h-full bg-primary transition-all duration-1000 ${activeMode === 'supersonic' ? 'w-full' : 'w-1/4'}`}></div></div>
                </div>
                <div className="space-y-1">
                   <div className="flex justify-between text-[9px] font-bold"><span>STRUCTURE_LOAD</span><span>{activeMode === 'supersonic' ? '82%' : '12%'}</span></div>
                   <div className="h-1.5 bg-muted overflow-hidden"><div className={`h-full bg-destructive transition-all duration-1000 ${activeMode === 'supersonic' ? 'w-[82%]' : 'w-[12%]'}`}></div></div>
                </div>
             </div>
          </div>
        </div>

        {/* 中间：机体展示主舞台 */}
        <div className="ui-reveal lg:col-span-8 relative bg-card border border-border flex items-center justify-center p-12 min-h-[500px] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.02)]">
           {/* 背景 HUD 装饰 */}
           <div className="absolute top-4 left-4 text-[8px] text-muted-foreground/30">VECTOR_ALIGN: TRUE</div>
           <div className="absolute bottom-4 right-4 text-[8px] text-muted-foreground/30 tracking-widest">TS_AERO_7200</div>
           
           <div className="absolute inset-12 border border-border/20 pointer-events-none"></div>

           <svg viewBox="0 0 400 500" className="w-full h-full max-w-[450px] relative z-10 overflow-visible">
              <path
                id="aircraft-path"
                className={`fill-none stroke-[2.5] transition-colors duration-1000 ${activeMode === 'supersonic' ? 'stroke-destructive' : activeMode === 'drone' ? 'stroke-purple-500' : 'stroke-primary'}`}
                d={FLIGHT_MODES.cruise}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 核心坐标标记 */}
              <circle cx="200" cy="300" r="4" className="fill-foreground animate-pulse" />
              <g className="opacity-10">
                <line x1="200" y1="50" x2="200" y2="450" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                <line x1="50" y1="250" x2="350" y2="250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
              </g>
           </svg>
        </div>

      </main>

      <footer className="ui-reveal w-full max-w-6xl pt-12 flex justify-center items-center border-t border-border mt-auto">
        <Link href="/">
          <button className="group px-10 py-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-90 transition-all cursor-pointer shadow-xl">
             Terminate_Mission_Control
             <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </Link>
      </footer>
    </div>
  );
}
