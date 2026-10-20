'use client';

import { useEffect, useId, useRef, useState } from 'react';
import './HeroFilm.css';
import EcosystemArchitecture from './EcosystemArchitecture';

export interface HeroFilmProps {
  webmSrc?: string;
  mp4Src?: string;
  posterSrc?: string;
  paused?: boolean;
  className?: string;
  aspectRatio?: number;
}

/** THE LIVING SYSTEM. Video-ready, with an architectural SVG when no film exists. */
export default function HeroFilm({
  webmSrc,
  mp4Src,
  posterSrc,
  paused = false,
  className = '',
  aspectRatio = 1,
}: HeroFilmProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const id = useId();
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [posterError, setPosterError] = useState(false);
  const [ready, setReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mobile, setMobile] = useState(false);
  const hasVideo = Boolean(webmSrc || mp4Src);
  const showVideo = ready && visible && pageVisible && hasVideo && !mobile && !reducedMotion && !videoError;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motion.matches);
    updateMotion();
    motion.addEventListener('change', updateMotion);
    const query = window.matchMedia('(max-width: 639px)');
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => {
      query.removeEventListener('change', update);
      motion.removeEventListener('change', updateMotion);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (containerRef.current) observer.observe(containerRef.current);
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!hasVideo) return;
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      } else {
        timer = setTimeout(() => setReady(true), 200);
      }
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.removeEventListener('load', schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [hasVideo]);

  useEffect(() => {
    setVideoError(false);
    setPosterError(false);
  }, [webmSrc, mp4Src, posterSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;
    if (paused) video.pause();
    else void video.play().catch((error: unknown) => {
      // AbortError is expected if pause interrupts an in-flight play request.
      if (!(error instanceof DOMException && error.name === 'AbortError')) setVideoError(true);
    });
  }, [paused, showVideo, webmSrc, mp4Src]);

  return (
    <div ref={containerRef} className={`hero-film ${className}`} data-paused={paused || reducedMotion || !visible || !pageVisible} style={{ aspectRatio: aspectRatio > 0 ? aspectRatio : 1 }}>
      {showVideo ? (
        <video
          key={`${webmSrc ?? ''}|${mp4Src ?? ''}`}
          ref={videoRef}
          className="hero-film__video"
          muted
          autoPlay={!paused}
          loop
          playsInline
          preload="none"
          poster={posterSrc}
          aria-label="The Living System: connected digital engineering architecture"
          onError={() => setVideoError(true)}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
        </video>
      ) : posterSrc && !posterError ? (
        <img width={400} height={400} loading="lazy" decoding="async" onError={() => setPosterError(true)} className="hero-film__poster" src={posterSrc} alt="The Living System architectural composition" />
      ) : (
        <svg className="engineering-lab__diagram" viewBox="0 0 600 520" role="img" aria-labelledby={`${id}-title ${id}-description`}>
          <title id={`${id}-title`}>Connected system blueprint</title>
          <desc id={`${id}-description`}>Interface, intelligence, and infrastructure connected around a central system. An illustrative diagram, not a live system monitor.</desc>
          <g transform="matrix(.7 .3 -.7 .3 300 270)" className="ecosystem__drawing-plane">
          <g className="engineering-lab__guides" fill="none">
            <path d="M40 80H360M40 160H360M40 240H360M40 320H360M80 40V360M160 40V360M240 40V360M320 40V360" />
            <circle cx="200" cy="200" r="145" />
            <circle cx="200" cy="200" r="110" />
            <path d="M200 25V375M25 200H375" />
          </g>
          <g className="hero-film__structure" fill="none">
            <path d="M80 115L200 53L320 115V285L200 347L80 285Z" />
            <path d="M80 115L200 200L320 115M80 285L200 200L320 285M200 53V347" />
            <path d="M80 115L200 347M320 115L200 347M80 285L200 53M320 285L200 53" />
          </g>
          <g className="engineering-lab__orbit" fill="none">
            <circle cx="200" cy="200" r="126" strokeDasharray="44 16 2 16" />
            <circle cx="326" cy="200" r="4" className="engineering-lab__signal" />
            <circle cx="74" cy="200" r="4" className="engineering-lab__signal" />
          </g>
          <g className="engineering-lab__connections" fill="none">
            <path d="M200 95V165M200 235V305M95 200H165M235 200H305" />
            <path d="M110 110L174 174M226 226L290 290M110 290L174 226M226 174L290 110" />
          </g>
          <g className="hero-film__hubs" fill="none">
            <path d="M80 108L86 115L80 122L74 115Z" />
            <path d="M320 108L326 115L320 122L314 115Z" />
            <path d="M200 340L206 347L200 354L194 347Z" />
            <circle cx="200" cy="53" r="5" />
          </g>
          <g className="engineering-lab__core" fill="none">
            <path d="M200 153L242 176V224L200 247L158 224V176Z" />
            <path d="M158 176L200 200L242 176M200 200V247M200 153V200" />
          </g>
          <g className="hero-film__pulse" fill="none" aria-hidden="true">
            <path d="M200 53V153" />
            <path d="M200 247V347" />
          </g>
          </g>
          <EcosystemArchitecture />
          <g className="ecosystem__labels">
            <text x="30" y="76">INTERFACE</text>
            <text x="30" y="92" className="ecosystem__caption">PRODUCT</text>
            <text x="570" y="170" textAnchor="end">INTELLIGENCE</text>
            <text x="570" y="293" textAnchor="end">AUTOMATION</text>
            <text x="30" y="382">INFRASTRUCTURE</text>
            <text x="30" y="398" className="ecosystem__caption">CLOUD</text>
          </g>
        </svg>
      )}
    </div>
  );
}
