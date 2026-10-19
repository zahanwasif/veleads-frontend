import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { ScrollReveal } from './ScrollReveal';

// Navigation, scroll reveals and footer shared by every page.
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen bg-surface text-text selection:bg-brand selection:text-on-brand">
      <ScrollReveal />
      <Navigation />
      <main className="w-full max-w-full overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}
