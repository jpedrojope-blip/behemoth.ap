import React, { useEffect, useRef, useState } from 'react';

type FooterLink = {
  title: string;
  href: string;
};

type FooterGroup = {
  label: string;
  links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
  {
    label: 'Explorar',
    links: [
      { title: 'Visão geral', href: '#visao' },
      { title: 'Módulos', href: '#modulos' },
      { title: 'Inteligência', href: '#inteligencia' },
    ],
  },
  {
    label: 'Jornada',
    links: [
      { title: 'Como funciona', href: '#como-funciona' },
      { title: 'Próximo passo', href: 'https://behemoth-i3qm.vercel.app' },
    ],
  },
];

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`site-footer react-footer ${isVisible ? 'is-footer-visible' : ''}`}
      data-react-mounted="true"
    >
      <div className="container react-footer-inner">
        <div className="react-footer-top">
          <div className="react-footer-brand" data-footer-item style={{ '--footer-delay': '0ms' } as React.CSSProperties}>
            <a className="footer-brand" href="#inicio" aria-label="Behemoth, início">
              <img src="assets/behemoth-logo-light.png" alt="Behemoth" />
            </a>
            <p>Clareza para decidir.</p>
            <span>O sistema operacional inteligente da sua empresa.</span>
          </div>

          <nav className="react-footer-nav" aria-label="Links do rodapé">
            {footerGroups.map((group, groupIndex) => (
              <div
                className="react-footer-group"
                key={group.label}
                data-footer-item
                style={{ '--footer-delay': `${120 + groupIndex * 90}ms` } as React.CSSProperties}
              >
                <h3>{group.label}</h3>
                <ul>
                  {group.links.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    return (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                        >
                          {link.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="react-footer-bottom" data-footer-item style={{ '--footer-delay': '300ms' } as React.CSSProperties}>
          <span>Uma visão para cada sinal do negócio.</span>
          <span>© {new Date().getFullYear()} Behemoth. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
