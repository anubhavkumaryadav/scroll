'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
          }
        }
      });

      tl.to("#hero-car", {
        x: "75vw", 
        ease: "none"
      }, 0)
      .to("#text-reveal-mask", {
        width: "100%",
        ease: "none"
      }, 0)
      .to("#hero-content-wrapper", {
        y: -250,
        ease: "none"
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="bg-slate-950 min-h-[250vh] relative">
      
      {/* Sticky/Pinned Hero Section */}
      <main ref={containerRef} className="sticky top-0 h-screen w-full bg-slate-950 text-white flex flex-col justify-between items-center overflow-hidden p-6 select-none">
        
        {/* Background Cinematic Car Image */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop" 
            alt="Background Car" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Wrapper that moves significantly upward on scroll */}
        <div id="hero-content-wrapper" className="w-full h-full flex flex-col justify-between items-center relative z-30">

          {/* Top Header */}
          <div className="text-center mt-4">
            <h1 className="text-xl md:text-3xl font-extrabold tracking-[0.4em] uppercase text-cyan-400 drop-shadow-md">
              W E L C O M E &nbsp; I T Z F I Z Z
            </h1>
          </div>

          {/* Center Road Track & Revealing Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-full h-48 md:h-56 bg-neutral-900 relative flex items-center overflow-hidden border-y-4 border-black shadow-2xl">
              
              <div id="text-reveal-mask" className="absolute left-0 top-0 h-full w-0 bg-[#22c55e] flex items-center px-10 overflow-hidden border-r-4 border-black whitespace-nowrap">
                <h2 className="text-4xl md:text-7xl font-black tracking-widest uppercase text-black">
                  W E L C O M E &nbsp; I T Z F I Z Z
                </h2>
              </div>

              {/* Horizontal McLaren 720S Car Image */}
              <img 
                id="hero-car" 
                src="https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png" 
                alt="McLaren 720S Top Down" 
                className="absolute left-4 w-44 md:w-60 h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] z-40"
              />

            </div>
          </div>

          {/* Bottom Scroll Percentage Progress Section (0% to 100%) */}
          <div className="mb-6 w-full max-w-md bg-slate-900/90 p-4 rounded-xl border border-cyan-500/40 shadow-2xl backdrop-blur-md text-center">
            <div className="text-xs font-semibold tracking-widest text-cyan-400 mb-1 uppercase">
              Scroll Journey Progress
            </div>
            <div className="text-4xl md:text-5xl font-extrabold text-white tracking-wider">
              {scrollProgress}%
            </div>
            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden mt-3 border border-slate-800">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-75"
                style={{ width: `${scrollProgress}%` }}
              ></div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}