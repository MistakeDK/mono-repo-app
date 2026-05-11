import Link from 'next/link';
import { Card } from '@mono/ui-components';
import { cn } from '@mono/ui-components';
import type { ToolDefinition } from './toolkit-types';

interface ToolCardProps {
  tool: ToolDefinition;
  active: boolean;
}

export function ToolCard({ tool, active }: ToolCardProps) {
  const className = cn(
    'min-h-23.5 gap-3 rounded-md border-border bg-card p-3 text-left text-card-foreground shadow-none transition-colors',
    'hover:border-primary/50 hover:bg-accent',
    active && 'border-primary/60 bg-accent shadow-inner',
    tool.disabled &&
      'cursor-not-allowed opacity-60 hover:border-border hover:bg-card',
  );

  const content = (
    <>
      <div className="flex w-full items-center justify-between gap-3 text-sm font-semibold">
        <span>{tool.title}</span>
        <span className="font-mono text-xs uppercase tracking-wider text-primary">
          {tool.badge}
        </span>
      </div>
      <p className="m-0 text-xs leading-snug text-muted-foreground">
        {tool.description}
      </p>
    </>
  );

  if (tool.disabled) {
    return (
      <Card aria-disabled="true" className={className}>
        {content}
      </Card>
    );
  }

  return (
    <Link aria-current={active ? 'page' : undefined} href={tool.href}>
      <Card className={className}>{content}</Card>
    </Link>
  );
}
