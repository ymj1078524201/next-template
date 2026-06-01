"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { 
  Zap, 
  Shield, 
  Cpu, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Activity,
  Terminal,
  MousePointer2
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const SECTORS = [
  { id: "01", title: "CORE_REACTOR", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/5", desc: "Primary energy containment field. Monitoring fusion stability and thermal output." },
  { id: "02", title: "NEURAL_MESH", icon: Cpu, color: "text-blue-500", bg: "bg-blue-500/5", desc: "High-density logic processing array. Synchronization latency at sub-millisecond levels." },
  { id: "03", title: "GLOBAL_COMMS", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-500/5", desc: "Satellite uplink established. Routing encrypted data streams through the orbital mesh." },
  { id: "04", title: "SYS_SECURITY", icon: Shield, color: "text-red-500", bg: "bg-red-500/5", desc: "Perimeter defense active. Real-time threat detection and automated counter-measures." },
];

export default function GSAPObserverPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animating = useRef(false);

  const goToSection = (index: number) => {
    if (animating.current) return;
    if (index < 0 || index >= SECTORS.length) return;

    animating.current = true;
    setCurrentIndex(index);

    // 动画容器位移
    gsap.to(".observer-panels", {
      yPercent: -index * 100,
      duration: 1.2,
      ease: "expo.inOut",
      onComplete: () => {
        animating.current = false;
      }
    });

    // 联动：内部内容动画
    const currentPanel = `.panel-${index}`;
    gsap.fromTo(`${currentPanel} .panel-content`, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
    );
  };

  useEffect(() => {
    // 初始首屏入场
    gsap.fromTo(`.panel-0 .panel-content`, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    );

    // 核心：创建 Observer 监听手势
    // 将 target 设置为 containerRef.current 而不是 window，防止干扰全局布局
    const obs = Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: () => goToSection(currentIndex - 1),
      onDown: () => goToSection(currentIndex + 1),
      tolerance: 10,
      preventDefault: true
    });

    return () => obs.kill();
  }, [currentIndex]);

  return (
    <div ref={containerRef} className="h-[calc(100vh-64px)] w-full bg-background text-foreground font-mono overflow-hidden relative">
      
      {/* 极简网格背景 - 改为 absolute */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      {/* 侧边进度 HUD - 改为 absolute */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-center">
        <div className="text-[10px] font-bold text-muted-foreground/40 vertical-text uppercase tracking-widest mb-4">Sectors</div>
        {SECTORS.map((s, i) => (
          <button 
            key={s.id} 
            onClick={() => goToSection(i)}
            className={`w-2 h-2 rounded-full border transition-all duration-500 cursor-pointer ${i === currentIndex ? 'bg-primary scale-150 border-primary shadow-[0_0_10px_var(--primary)]' : 'border-border bg-transparent'}`}
          />
        ))}
      </div>

      {/* 顶部状态 HUD - 改为 absolute 并调整 z-index */}
      <header className="absolute top-0 left-0 w-full p-8 z-40 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-black text-lg tracking-tighter uppercase">Observer_OS.v1</div>
            <div className="text-[8px] text-slate-500 uppercase tracking-[0.3em]">Gesture_Input_Lock: ON</div>
          </div>
        </div>
        <div className="flex items-center gap-8">
           <div className="hidden md:flex flex-col items-end">
              <div className="text-[8px] text-slate-500 uppercase">Current_Sector</div>
              <div className="text-xs font-bold text-white uppercase">{SECTORS[currentIndex].title}</div>
           </div>
           <Link href="/">
              <button className="px-6 py-2 border border-white/20 text-[10px] uppercase font-bold text-white hover:bg-white hover:text-black transition-all cursor-pointer">
                Exit
              </button>
           </Link>
        </div>
      </header>

      {/* 主面板容器 */}
      <div className="observer-panels w-full h-full will-change-transform">
        {SECTORS.map((sector, i) => (
          <section 
            key={sector.id} 
            className={`panel-${i} w-full h-full flex items-center justify-center relative overflow-hidden`}
          >
            {/* 背景大图标装饰 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
               <sector.icon className="w-[60vw] h-[60vw]" />
            </div>

            <div className="panel-content max-w-4xl px-12 text-center space-y-12">
               <div className="space-y-4">
                  <div className={`inline-flex items-center gap-3 px-4 py-2 border border-current/20 ${sector.color} ${sector.bg} backdrop-blur-sm`}>
                     <sector.icon className="w-6 h-6" />
                     <span className="text-xs font-black uppercase tracking-[0.3em]">Sector_{sector.id}</span>
                  </div>
                  <h2 className="text-6xl md:text-9xl font-black text-foreground uppercase tracking-tighter leading-none italic">
                     {sector.title}
                  </h2>
               </div>

               <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed uppercase tracking-tighter">
                  {sector.desc}
               </p>

               <div className="flex justify-center gap-12 pt-8">
                  <div className="text-left space-y-2">
                     <div className="text-[10px] font-bold text-muted-foreground uppercase">Load_Factor</div>
                     <div className="flex gap-1">
                        {[...Array(10)].map((_, j) => (
                          <div key={j} className={`w-1 h-3 ${j < (i + 3) * 2 ? sector.color.replace('text', 'bg') : 'bg-muted'}`}></div>
                        ))}
                     </div>
                  </div>
                  <div className="text-left space-y-2">
                     <div className="text-[10px] font-bold text-muted-foreground uppercase">Auth_Key</div>
                     <div className="text-xs font-bold text-foreground">0x{String.fromCharCode(212321321).charCodeAt(2).toString().toUpperCase()}</div>
                  </div>
               </div>
            </div>
          </section>
        ))}
      </div>

      {/* 底部导航提示 - 改为 absolute */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
        <div className="flex flex-col items-center animate-bounce opacity-40">
           {currentIndex === 0 ? <ChevronDown className="w-4 h-4" /> : currentIndex === SECTORS.length - 1 ? <ChevronUp className="w-4 h-4" /> : (
             <div className="flex flex-col"><ChevronUp className="w-4 h-4" /><ChevronDown className="w-4 h-4" /></div>
           )}
        </div>
        <div className="text-[8px] uppercase tracking-[0.5em] text-muted-foreground flex items-center gap-2">
           <MousePointer2 className="w-3 h-3" />
           {currentIndex === SECTORS.length - 1 ? "Up_to_Reset" : "Scroll_to_Navigate"}
        </div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
