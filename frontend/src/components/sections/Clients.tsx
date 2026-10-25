'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import './ClientsEditorial.css';
import './ImpactTechnology.css';

type Client = {
  name: string;
  logo: string;
  cardBg: string;
  border: string;
  display: { background: 'dark' | 'light'; maxWidth: string; maxHeight: string; padding: string };
  businessDescription?: string;
  website?: string;
};

// Brand logos only — presentation surfaces use the shared semantic palette.
const clients: Client[] = [
  {
    name: 'Legal Sujhav',
    logo: '/clients/legalsujhav.png',
    businessDescription: 'A digital platform connecting individuals with legal guidance and advisory services.',
    cardBg: 'hsl(var(--surface-elevated))',
    border: '1px solid hsl(var(--border))',
    display: { background: 'dark', maxWidth: '94%', maxHeight: '84%', padding: '0.5rem 0.75rem' },
  },
  {
    name: 'Herbal Kitchen',
    logo: '/clients/herbal-kitchen-nobg.png',
    website: 'https://herbalkitchen.in',
    cardBg: 'hsl(var(--surface-elevated))',
    border: '1px solid hsl(var(--border))',
    display: { background: 'light', maxWidth: '86%', maxHeight: '94%', padding: '0.35rem' },
  },
  {
    name: 'Ghar Ka Dabba',
    logo: '/clients/ghar-ka-dabba-nobg.png',
    businessDescription: 'A home-cooked meal and tiffin delivery service serving local customers.',
    website: 'https://gharkadabba.in',
    cardBg: 'hsl(var(--surface-elevated))',
    border: '1px solid hsl(var(--border))',
    display: { background: 'light', maxWidth: '80%', maxHeight: '92%', padding: '0.3rem' },
  },
  {
    name: 'VanshVeda',
    logo: '/clients/vanshveda-nobg.png',
    businessDescription: 'A digital platform for preserving and exploring family genealogy, heritage records, and ancestral histories.',
    website: 'https://vanshveda.com',
    cardBg: 'hsl(var(--surface-elevated))',
    border: '1px solid hsl(var(--border))',
    display: { background: 'light', maxWidth: '76%', maxHeight: '92%', padding: '0.4rem' },
  },
  {
    name: 'Knowledge King',
    logo: '/clients/knowledgeKing-nobg.png',
    businessDescription: 'An overseas education consultancy helping students plan and pursue study opportunities abroad.',
    website: 'https://www.knowledgekingdom.in',
    cardBg: 'hsl(var(--surface-elevated))',
    border: '1px solid hsl(var(--border))',
    display: { background: 'light', maxWidth: '78%', maxHeight: '92%', padding: '0.3rem' },
  },
  {
    name: 'PulsarIP',
    logo: '/clients/pulsarip.png',
    businessDescription: 'An intellectual property and corporate legal platform for trademark, patent, and enterprise compliance services.',
    website: 'https://pulsarip.com',
    cardBg: 'hsl(var(--surface-elevated))',
    border: '1px solid hsl(var(--border))',
    display: { background: 'dark', maxWidth: '88%', maxHeight: '88%', padding: '0.4rem 0.6rem' },
  },
];

function LogoDisplay({ client, expanded = false }: { client: Client; expanded?: boolean }) {
  const display = client.display;
  return (
    <span
      className={`clients-editorial__logo-display clients-editorial__logo-display--${display?.background ?? 'dark'}${expanded ? ' clients-editorial__logo-display--expanded' : ''}`}
      style={display ? {
        '--logo-max-width': expanded ? 'min(78vw, 42rem)' : display.maxWidth,
        '--logo-max-height': expanded ? 'min(62vh, 28rem)' : display.maxHeight,
        '--logo-padding': expanded ? 'clamp(1rem, 3vw, 2rem)' : display.padding,
      } as CSSProperties : undefined}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={expanded ? 900 : 200}
        height={expanded ? 520 : 96}
        className="clients-editorial__artifact-logo"
      />
    </span>
  );
}

function FilmScene({ kind, value, label, index }: { kind: string; value: string; label: string; index: number }) {
  return (
    <motion.article className={`agency-filmstrip__scene agency-filmstrip__scene--${kind}`} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.12, duration: 0.65 }}>
      <div className="agency-filmstrip__scene-top"><span>REEL / 0{index + 1}</span><i aria-hidden="true" /></div>
      <div className="agency-filmstrip__texture" aria-hidden="true"><span /><span /><span /></div>
      <p className="agency-filmstrip__value">{value}</p>
      <p className="agency-filmstrip__label">{label}</p>
      <span className="agency-filmstrip__frame" aria-hidden="true" />
    </motion.article>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const exhibitY = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18]);
  const reveal = reduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      };

  useEffect(() => {
    if (!selectedClient) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus();
    };
  }, [selectedClient]);

  const openClient = (client: Client, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setSelectedClient(client);
  };

  const closeClient = () => setSelectedClient(null);

  const handleArtifactKeyDown = (event: KeyboardEvent<HTMLElement>, client: Client) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openClient(client, event.currentTarget);
    }
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeClient();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <section ref={sectionRef} className="clients-editorial" aria-labelledby="clients-heading">
      <motion.div
        className="clients-editorial__rule"
        initial={reduceMotion ? false : { scaleX: 0, transformOrigin: 'left' }}
        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={reduceMotion ? undefined : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div className="clients-editorial__intro" {...reveal}>
        <div className="clients-editorial__index" aria-hidden="true">
          <span>03</span>
          <i />
          <span>PROOF OF WORK</span>
        </div>
        <div className="clients-editorial__heading-wrap">
          <p className="clients-editorial__kicker">CLIENT ARCHIVE / {String(clients.length).padStart(2, '0')} MARKS</p>
          <h2 id="clients-heading">Trusted By Industry Leaders</h2>
        </div>
        <p className="clients-editorial__aside" aria-hidden="true">LOGO SYSTEM<br />FIELD / 03</p>
      </motion.div>

      <motion.div className="clients-editorial__gallery" aria-label="Client logos" {...reveal}>
        <div className="clients-editorial__exhibit-label" aria-hidden="true">
          <span>ZERO GRAVITY / CLIENT ARCHIVE</span>
          <span>{String(clients.length).padStart(2, '0')} AUTHENTIC MARKS</span>
        </div>
        <motion.div className="clients-editorial__exhibit" role="group" aria-label="Client logo artifacts" style={{ y: reduceMotion ? 0 : exhibitY }}>
          {clients.map((client, index) => (
            <motion.article
              key={client.name}
              className={`clients-editorial__artifact clients-editorial__artifact--${index + 1}`}
              role="button"
              initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: index % 2 ? 1.5 : -1.5 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: index % 2 ? -0.5 : 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduceMotion ? undefined : { duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onPointerMove={event => {
                if (reduceMotion) return;
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
                event.currentTarget.style.setProperty('--pointer-x', `${x}px`);
                event.currentTarget.style.setProperty('--pointer-y', `${y}px`);
              }}
              onPointerLeave={event => {
                event.currentTarget.style.setProperty('--pointer-x', '0px');
                event.currentTarget.style.setProperty('--pointer-y', '0px');
              }}
              tabIndex={0}
              aria-label={`View ${client.name} logo`}
              onClick={event => openClient(client, event.currentTarget)}
              onKeyDown={event => handleArtifactKeyDown(event, client)}
              style={{ background: client.cardBg, border: client.border }}
            >
              <span className="clients-editorial__artifact-index" aria-hidden="true">0{index + 1} / {String(clients.length).padStart(2, '0')}</span>
              <span className="clients-editorial__artifact-line" aria-hidden="true" />
              <LogoDisplay client={client} />
              <span className="clients-editorial__artifact-name">{client.name}</span>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="agency-filmstrip" aria-label="Client and project statistics" {...reveal}>
        <div className="agency-filmstrip__header" aria-hidden="true"><span>AGENCY FILMSTRIP / SELECTED WORK</span><span>04 SCENES / ONE PRACTICE</span></div>
        <div className="agency-filmstrip__scenes">
          <FilmScene kind="clients" value="50+" label="Happy Clients" index={0} />
          <FilmScene kind="projects" value="100+" label="Projects Delivered" index={1} />
          <FilmScene kind="satisfaction" value="98%" label="Client Satisfaction" index={2} />
          <FilmScene kind="support" value="24/7" label="Support Available" index={3} />
        </div>
      </motion.div>
      {selectedClient && typeof document !== 'undefined' && createPortal(
        <div className="clients-editorial__modal" role="presentation" onMouseDown={event => event.target === event.currentTarget && closeClient()}>
          <div
            className="clients-editorial__modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-modal-title"
            onKeyDown={handleDialogKeyDown}
          >
            <div className="clients-editorial__modal-chrome" aria-hidden="true">
              <span>ZERO GRAVITY / EXHIBIT</span>
              <span>ARCHIVE / {String(clients.indexOf(selectedClient) + 1).padStart(2, '0')}</span>
            </div>
            <button ref={closeButtonRef} type="button" className="clients-editorial__modal-close" onClick={closeClient} aria-label="Close client logo display">
              <span aria-hidden="true">×</span>
              Close
            </button>
            <div className="clients-editorial__modal-profile">
              <div className="clients-editorial__modal-display">
                <LogoDisplay client={selectedClient} expanded />
              </div>
              <div className="clients-editorial__modal-info">
                <h3 id="client-modal-title">{selectedClient.name}</h3>
                {selectedClient.businessDescription && <p className="clients-editorial__modal-description">{selectedClient.businessDescription}</p>}
                {selectedClient.website && (
                  <a className="clients-editorial__modal-website" href={selectedClient.website} target="_blank" rel="noopener noreferrer">
                    <span><small>OFFICIAL WEBSITE</small><strong>{selectedClient.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</strong></span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
