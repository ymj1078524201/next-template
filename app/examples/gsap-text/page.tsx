"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// 引入 SplitText 插件
import { SplitText } from "gsap/SplitText";
import { 
  Type, 
  RefreshCcw, 
  Terminal, 
  ArrowRight,
  ShieldCheck,
  Binary,
  Code2
} from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function GSAPSplitTextPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sequenceRunningRef = useRef(false);
  const [sequenceActive, setSequenceActive] = useState(false);

  const playTextSequence = useCallback((options?: { updateUi?: boolean }) => {
    if (sequenceRunningRef.current) return;
    sequenceRunningRef.current = true;
    if (options?.updateUi) setSequenceActive(true);

    const q = gsap.utils.selector(containerRef);
    const tl = gsap.timeline({
      onComplete: () => {
        sequenceRunningRef.current = false;
        if (options?.updateUi) setSequenceActive(false);
      },
    });

    // 1. 标题：字符切割与下落动画
    const headerSplit = new SplitText(q(".split-header"), { type: "chars" });
    tl.from(headerSplit.chars, {
      opacity: 0,
      y: -50,
      rotationX: -90,
      stagger: 0.03,
      duration: 0.8,
      ease: "back.out(2)"
    });

    // 2. 副标题：单词切割与随机闪烁
    const subSplit = new SplitText(q(".split-sub"), { type: "words" });
    tl.from(subSplit.words, {
      opacity: 0,
      scale: 1.2,
      filter: "blur(10px)",
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // 3. 详细描述：行切割与逐行滑入 (最能体现高级感的效果)
    const lineSplit = new SplitText(q(".split-lines"), { type: "lines" });
    // 为每一行包裹一个溢出隐藏的容器，实现“从缝隙中钻出来”的效果
    gsap.set(lineSplit.lines, { overflow: "hidden" });
    tl.from(lineSplit.lines, {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.2");

    // 4. 模拟控制台日志：随机字符流
    tl.fromTo(q(".log-line"), 
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, stagger: 0.2, duration: 0.4 },
      "-=0.5"
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => playTextSequence(), containerRef);
    return () => ctx.revert();
  }, [playTextSequence]);

  const handleReplay = () => playTextSequence({ updateUi: true });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-mono p-4 md:p-12 relative overflow-hidden flex flex-col items-center">
      
      {/* 极简网格背景 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <header className="w-full max-w-4xl flex justify-between items-center mb-16 border-b border-border pb-8 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 border border-purple-500/20">
              <Type className="w-5 h-5 text-purple-500" />
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase">
              Text_Splitting_Protocol
            </h1>
          </div>
          <div className="text-[8px] tracking-[0.4em] text-muted-foreground uppercase">Typography_Dismantle_Sequence_v9.0</div>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] text-right uppercase">
           <div><span className="opacity-30">Status:</span> <span className="text-purple-500 font-bold">READY</span></div>
           <div><span className="opacity-30">Plugin:</span> <span className="font-bold">SplitText</span></div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl space-y-24 relative z-10">
        
        {/* 核心展示区 */}
        <div className="space-y-12 py-12">
          
          <div className="space-y-6">
            <h2 className="split-header text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              DECRYPTION_ACTIVE
            </h2>
            
            <div className="split-sub text-xl md:text-2xl font-bold text-purple-500 italic uppercase">
              Orchestrating granular character manipulation in real-time.
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-purple-500/50 via-transparent to-transparent"></div>

          <p className="split-lines text-lg md:text-2xl text-foreground/80 leading-relaxed font-sans max-w-3xl">
            In a world of static information, the ability to control the temporal appearance 
            of every single line, word, and letter creates a deep cognitive connection with the observer. 
            This protocol demonstrates the standard for high-end digital interfaces.
          </p>

        </div>

        {/* 底部功能区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-border">
           
           <div className="space-y-6">
              <div className="flex items-center gap-3 text-purple-500">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">System_Console_Output</span>
              </div>
              <div className="space-y-2 font-mono text-[10px] text-muted-foreground bg-card p-6 border border-border">
                 <div className="log-line text-blue-400">&gt; INITIALIZING_SPLIT_SEQUENCE...</div>
                 <div className="log-line">&gt; Node found: .split-header (34 chars)</div>
                 <div className="log-line">&gt; Node found: .split-sub (48 words)</div>
                 <div className="log-line">&gt; Applying cubic-bezier(0.19, 1, 0.22, 1)</div>
                 <div className="log-line text-green-500">&gt; SEQUENCE_RENDER_SUCCESSFUL.</div>
              </div>
           </div>

           <div className="flex flex-col justify-center items-center md:items-end gap-6">
              <button 
                onClick={handleReplay}
                disabled={sequenceActive}
                className={`group flex items-center gap-3 px-10 py-5 bg-foreground text-background font-black text-xs uppercase tracking-[0.2em] transition-all cursor-pointer hover:bg-purple-600 hover:text-white ${sequenceActive ? 'opacity-50 grayscale' : ''}`}
              >
                <RefreshCcw className={`w-4 h-4 ${sequenceActive ? 'animate-spin' : ''}`} />
                Re_Execute_Sequence
              </button>
              
              <Link href="/">
                <button className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer">
                  [ TERMINATE_AND_RETURN ]
                  <ArrowRight className="w-3 h-3" />
                </button>
              </Link>
           </div>

        </div>

      </main>

      {/* 装饰性文字底层 */}
      <div className="fixed bottom-0 right-0 text-[15vw] font-black text-foreground/[0.01] pointer-events-none select-none uppercase">
        Glyph
      </div>

    </div>
  );
}
