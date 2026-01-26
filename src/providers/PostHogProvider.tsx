import posthog from 'posthog-js';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Ініціалізація PostHog
posthog.init('phc_pD8dlXRfPgmM4cZDrDHPpUHxKeerl0AOFKqvfuFYiJk', {
  api_host: 'https://us.i.posthog.com',
  loaded: (posthog) => {
    if (import.meta.env.DEV) posthog.debug();
  },
  capture_pageview: false, // Вимикаємо автоматичний трекінг, бо робимо вручну для SPA
});

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Трекаємо перегляди сторінок при навігації
  useEffect(() => {
    posthog.capture('$pageview', {
      $current_url: window.location.href,
    });
  }, [location]);

  return <>{children}</>;
}

export { posthog };
