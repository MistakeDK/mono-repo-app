import type { ReactNode } from 'react';
import Link from 'next/link';
import { ToolNavigation } from './tool-navigation';

export function DeveloperToolkitShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground">
      <header className="top-0 z-10 sticky bg-background/90 backdrop-blur-xl border-border border-b">
        <div className="flex justify-between items-center gap-6 mx-auto px-6 max-w-310 min-h-12.5">
          <Link className="font-semibold text-sm tracking-normal" href="/">
            developer-toolkit
          </Link>
          <span className="hidden before:block sm:inline-flex items-center before:bg-primary before:shadow-lg before:shadow-primary/50 before:mr-2 px-2.5 border border-border rounded-full before:rounded-full min-h-8 before:size-1.5 font-mono text-muted-foreground text-xs">
            client-side &middot; no upload
          </span>
        </div>
      </header>

      <main>
        <section className="flex items-stretch py-5 md:py-8 min-h-dvh">
          <div className="flex flex-col mx-auto px-6 w-full max-w-310">
            <div className="mb-4.5">
              <p className="mb-2.5 font-mono text-primary text-xs uppercase tracking-wider">
                Developer tools &middot; desktop web
              </p>
              <h1 className="m-0 font-semibold text-3xl leading-tight">
                Decode tokens. Format JSON. Stay in flow.
              </h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Select a utility card below, then work inside the focused input
                and output panes.
              </p>
            </div>

            <ToolNavigation />
            {children}
          </div>
        </section>
      </main>

      <footer className="py-2.5 border-border border-t text-muted-foreground text-sm text-center">
        <span>developer-toolkit v1.0 &middot; NoMistakeDK</span>
      </footer>
    </div>
  );
}
