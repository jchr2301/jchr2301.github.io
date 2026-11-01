import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { normalizePath, pageMetadata } from '../content/site';

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

export function NavigationEffects() {
  const [location] = useLocation();
  const previousPath = useRef(location);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => { fromHistory.current = true; };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useLayoutEffect(() => {
    const metadata = pageMetadata(location);
    document.title = metadata.title;
    setMeta('name', 'description', metadata.description);
    setMeta('name', 'robots', metadata.indexable ? 'index, follow' : 'noindex, follow');
    setMeta('property', 'og:title', metadata.title);
    setMeta('property', 'og:description', metadata.description);
    setMeta('name', 'twitter:title', metadata.title);
    setMeta('name', 'twitter:description', metadata.description);
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const current = normalizePath(location);
    const canonical = `${window.location.origin}${base}${current === '/' ? '/' : `${current}/`}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.append(link);
    }
    link.href = canonical;
    setMeta('property', 'og:url', canonical);

    // A new route starts at its heading; browser back/forward keeps native restoration.
    if (previousPath.current !== location && !fromHistory.current) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    previousPath.current = location;
    fromHistory.current = false;
  }, [location]);

  return null;
}
