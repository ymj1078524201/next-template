"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { 
  Navigation, 
  Send, 
  Zap, 
  ArrowRight,
  Activity,
  Crosshair,
  Compass,
  Cpu
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

export default function GSAPMotionPathPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    const q = gsap.utils.selector(containerRef);
    
    // Initial reveal
    gsap.fromTo(q(".ui-reveal"), 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const startFlight = () => {
    if (isFlying) return;
    setIsFlying(true);

    const tl = gsap.timeline({
      onComplete: () => setIsFlying(false)
    });

    // 魔法点：让 #packet 沿着 #path-route 飞
    tl.to("#packet", {
      duration: 5,
      motionPath: {
        path: "#path-route",
        align: "#path-route",
        autoRotate: true, // 关键：自动旋转，让头部始终朝前
        alignOrigin: [0.5, 0.5]
      },
      ease: "power2.inOut",
      onUpdate: function() {
         // 联动：可以根据进度改变一些数值，这里我们动一下能量值
         const progress = Math.round(this.progress() * 100);
         const progressEl = document.querySelector(".flight-progress");
         if (progressEl) progressEl.textContent = `${progress}%`;
      }
    });

    // 联动：路径光效
    tl.fromTo("#path-glow", 
      { strokeDashoffset: 1500 },
      { strokeDashoffset: 0, duration: 5, ease: "power2.inOut" },
      0
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-mono p-4 md:p-12 relative overflow-hidden flex flex-col items-center">
      {/* 赛博朋克背景 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(var(--background),0.8)_100%)]"></div>

      <header className="ui-reveal w-full max-w-5xl flex justify-between items-center mb-16 border-b border-border pb-8 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 border border-orange-500/20">
              <Navigation className="w-5 h-5 text-orange-500" />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase">
              Motion_Path_Trajectory
            </h1>
          </div>
          <div className="text-[8px] tracking-[0.4em] text-muted-foreground uppercase">Kinetic_Routing_Protocol_v4.2</div>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] text-right uppercase">
           <div><span className="opacity-30">Tracking:</span> <span className="text-orange-500 font-bold">ACTIVE</span></div>
           <div><span className="opacity-30">Plugin:</span> <span className="font-bold">MotionPath</span></div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl flex flex-col lg:grid lg:grid-cols-12 gap-12 relative z-10">
        
        {/* 左侧：路径可视化区域 */}
        <div className="ui-reveal lg:col-span-8 relative bg-card border border-border p-8 flex items-center justify-center min-h-[500px]">
           {/* 背景 HUD 装饰 */}
           <div className="absolute inset-8 border border-border/10 pointer-events-none"></div>
           <Crosshair className="absolute top-4 left-4 w-4 h-4 text-muted-foreground/20" />
           <Crosshair className="absolute bottom-4 right-4 w-4 h-4 text-muted-foreground/20" />

           <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-[0_0_20px_rgba(249,115,22,0.1)]">
              {/* 核心运动路径 (静电参考线) */}
              <path
                id="path-route"
                className="fill-none stroke-foreground/[0.03] stroke-[2]"
                d="M50,250 C150,50 300,450 400,250 S650,50 750,250"
              />
              
              {/* 动态路径光效 */}
              <path
                id="path-glow"
                className="fill-none stroke-orange-500/20 stroke-[4]"
                d="M50,250 C150,50 300,450 400,250 S650,50 750,250"
                strokeDasharray="1500"
                strokeDashoffset="1500"
              />

              {/* 飞行物 (数据包) */}
              <g id="packet">
                {/* 飞行物主体：一个带有方向感的箭头形状 */}
                <path d="M-15,-10 L15,0 L-15,10 Z" className="fill-orange-500" />
                <circle r="20" className="fill-orange-500/10 stroke-orange-500/30" />
                <line x1="-15" y1="0" x2="-40" y2="0" className="stroke-orange-500/50 stroke-[2] animate-pulse" />
              </g>

              {/* 坐标标注 */}
              <g className="text-[10px] fill-muted-foreground font-mono">
                <text x="60" y="270">START_P0</text>
                <text x="380" y="270">MID_WAY_P1</text>
                <text x="700" y="270">DEST_END</text>
              </g>
           </svg>
        </div>

        {/* 右侧：飞行控制台 */}
        <div className="ui-reveal lg:col-span-4 space-y-8">
           <div className="p-6 bg-card border border-border space-y-6">
              <div className="flex items-center gap-3 text-orange-500">
                <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-[10px] font-black uppercase tracking-widest">Flight_Controller</span>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] uppercase font-bold">
                    <span>Traversal_Progress</span>
                    <span className="flight-progress">0%</span>
                  </div>
                  <div className="h-1.5 bg-muted w-full">
                    <div className={`h-full bg-orange-500 transition-all duration-300 shadow-[0_0_10px_#f97316]`} style={{ width: isFlying ? '100%' : '0%', transitionDuration: isFlying ? '5s' : '0s', transitionTimingFunction: 'linear' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-muted/50 border border-border text-center">
                    <div className="text-[8px] text-muted-foreground uppercase">Velocity</div>
                    <div className="text-xs font-bold">842.1 km/s</div>
                  </div>
                  <div className="p-3 bg-muted/50 border border-border text-center">
                    <div className="text-[8px] text-muted-foreground uppercase">Heading</div>
                    <div className="text-xs font-bold">AUTO_SYNC</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={startFlight}
                disabled={isFlying}
                className={`w-full py-4 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] transition-all cursor-pointer ${isFlying ? 'bg-muted text-muted-foreground opacity-50' : 'bg-orange-500 text-black hover:bg-orange-400'}`}
              >
                <Send className="w-4 h-4" />
                Initiate_Launch
              </button>
           </div>

           <div className="p-6 border-l-2 border-orange-500/50 bg-card space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground">
                 <Activity className="w-3 h-3 text-orange-500" /> System_Logs
              </div>
              <div className="text-[9px] text-muted-foreground space-y-2 leading-relaxed">
                 <div>&gt; Path interpolation: <span className="font-bold">Cubic Bezier</span></div>
                 <div>&gt; Auto-rotation: <span className="font-bold">ENABLED</span></div>
                 <div>&gt; Calculating delta between p0 and p1...</div>
                 {isFlying && <div className="text-orange-400 animate-pulse">&gt; DATA_PACKET_IN_TRANSIT...</div>}
              </div>
           </div>
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
           Kinetic_Engine_Standby
        </div>
      </footer>
    </div>
  );
}
