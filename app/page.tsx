"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, ArrowRight, Cpu, Zap, Layers } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of hero elements
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Module cards entrance
      gsap.from(".module-card", {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: modulesRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Type Safety",
      code: "ZOD_STRICT_V4",
      description: "End-to-end type safety from API to UI, eliminating runtime errors with Zod validation.",
      icon: ShieldCheck,
      href: "/examples/swr-demo",
      status: "Operational",
    },
    {
      title: "Modular Layout",
      code: "APP_ROUTER_V16",
      description: "Optimized folder structure for scalable enterprise applications using Next.js 16.",
      icon: Layers,
      href: "#",
      status: "Active",
    },
    {
      title: "Performance",
      code: "NEXT_TURBO_EN",
      description: "Minimal bundle size with optimized server components and streaming infrastructure.",
      icon: Zap,
      href: "#",
      status: "Optimized",
    },
    {
      title: "Global State",
      code: "ZUSTAND_SYNC",
      description: "Persistent state with zero-flicker server-side synchronization and hydration.",
      icon: Cpu,
      href: "#",
      status: "Operational",
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '128px 128px' }}></div>

      <main className="relative container max-w-6xl mx-auto px-6 pt-24 pb-32">
        {/* Header Decals */}
        <div className="flex justify-between items-start mb-16 opacity-40 font-mono text-[10px] tracking-widest uppercase">
          <div className="reveal">ID: NT-2026-X1</div>
          <div className="reveal text-right">LOC: CORE_SYSTEM</div>
        </div>

        {/* Hero Section */}
        <section ref={heroRef} className="mb-32 space-y-8">
          <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 text-xs font-mono mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM VERSION: 16.2.6_STABLE
          </div>
          
          <h1 className="reveal text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            ENGINEERING <br />
            <span className="text-primary italic">PROTOCOLS</span>
          </h1>
          
          <p className="reveal text-xl text-muted-foreground max-w-2xl leading-relaxed">
            A high-performance Next.js template built for stability, type safety, and 
            enterprise-grade scalability. Built for engineers who demand precision.
          </p>

          <div className="reveal flex flex-wrap gap-4 pt-4">
            <Link href="/examples/swr-demo">
              <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold overflow-hidden transition-all hover:pr-12 cursor-pointer">
                <span className="relative z-10 flex items-center gap-2">
                  INITIATE SYSTEM <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute top-0 right-0 h-full w-1 bg-white/20"></div>
              </button>
            </Link>
            <button className="px-8 py-4 border-2 border-primary/20 hover:border-primary/50 transition-colors font-bold uppercase tracking-wider text-sm cursor-pointer">
              Documentation
            </button>
          </div>
        </section>

        {/* Module Grid */}
        <section ref={modulesRef} className="grid md:grid-cols-2 gap-px bg-border/50 border overflow-hidden">
          {features.map((f, i) => (
            <div key={i} className="module-card group bg-background p-8 relative overflow-hidden">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
                REF: {f.code}
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="p-3 w-fit rounded-lg bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <f.icon className="w-6 h-6" />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight">{f.title}</h3>
                    <div className="h-px flex-1 bg-border/50"></div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dashed">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    {f.status}
                  </div>
                  <Link href={f.href} className="text-xs font-bold hover:text-primary flex items-center gap-1 uppercase tracking-widest">
                    Access <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* System Footer Info */}
        <div className="mt-32 pt-16 border-t border-dashed flex flex-col md:flex-row justify-between gap-8 opacity-40 font-mono text-[10px] uppercase">
          <div className="space-y-2">
            <div>FRAMEWORK: NEXT.JS_16_REACT_19</div>
            <div>STYLES: TAILWIND_V4_CSS</div>
          </div>
          <div className="space-y-2 text-right">
            <div>BUILD_DATE: 2026.06.01</div>
            <div>STATUS: MISSION_CRITICAL_READY</div>
          </div>
        </div>
      </main>

      {/* Background Decal */}
      <div className="fixed -bottom-32 -right-32 w-96 h-96 border-[40px] border-primary/5 rounded-full pointer-events-none"></div>
    </div>
  );
}
