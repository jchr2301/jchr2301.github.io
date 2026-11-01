import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { profile } from '../content/profile';
import { publicRecords } from '../content';
import { activities } from '../content/activities';
import { isNavActive, normalizePath } from '../content/site';
import { NavigationEffects } from './NavigationEffects';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  ...(publicRecords(activities).length ? [{ href: '/activities', label: 'Activities' }] : []),
  { href: '/about', label: 'About' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setMenuOpen(false); }, [location]);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <NavigationEffects />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" data-testid="site-header">
        <div className="header-inner">
          <Link href="/" className="brand-mark" data-testid="link-brand" onClick={() => { setMenuOpen(false); if (normalizePath(location) === "/") window.scrollTo({ top: 0, behavior: "instant" }); }}>
            <span className="brand-name">{profile.displayName || profile.name}</span>
          </Link>
          <button ref={menuButton} aria-controls="main-navigation" className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" data-testid="main-navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={`nav-link ${isNavActive(location, item.href) ? 'active' : ''}`} aria-current={isNavActive(location, item.href) ? 'page' : undefined} data-testid={`link-nav-${item.label.toLowerCase()}`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-line">A portfolio built from the work, not the adjectives.</span>
          {profile.email?.trim()
             ? <a href={`mailto:${profile.email}`} className="footer-link" data-testid="link-footer-contact">Email <ArrowUpRight size={14} /></a>
            : <Link href="/about" className="footer-link" data-testid="link-footer-about">About & contact <ArrowUpRight size={14} /></Link>}
          {profile.links?.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="footer-link">{link.label}<ArrowUpRight size={14} /></a>)}
        </div>
      </footer>
    </div>
  );
}
