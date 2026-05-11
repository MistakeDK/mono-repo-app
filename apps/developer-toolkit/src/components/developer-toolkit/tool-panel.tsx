import type { ReactNode } from 'react';

interface ToolPanelProps {
  children: ReactNode;
}

interface ToolPaneProps {
  actions?: ReactNode;
  children: ReactNode;
  title: string;
}

export function ToolPanel({ children }: ToolPanelProps) {
  return (
    <section className="flex-1 bg-card border border-border overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-160">
        {children}
      </div>
    </section>
  );
}

export function ToolPane({ actions, children, title }: ToolPaneProps) {
  return (
    <div className="flex flex-col border-border max-lg:border-t max-lg:first:border-t-0 lg:border-l lg:first:border-l-0 min-w-0 h-full">
      <div className="flex justify-between items-center gap-3 bg-surface-raised px-3 border-border border-b min-h-11 shrink-0">
        <h2 className="m-0 font-semibold text-sm leading-tight">{title}</h2>
        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : null}
      </div>
      <div className="flex flex-col flex-1 w-full min-h-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
