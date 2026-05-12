import Link from 'next/link';
import { Button, Card } from '@mono/ui-components';
import type { ToolId } from './toolkit-types';
import { tools } from './toolkit-utils';

export function ComingSoonTool({ toolId }: { toolId: ToolId }) {
  const tool = tools.find((item) => item.id === toolId);

  return (
    <section className="flex-1 bg-card border border-border overflow-hidden">
      <Card className="justify-center gap-4 bg-card shadow-none p-8 border-0 rounded-none min-h-140 text-center">
        <p className="mx-auto mb-0 max-w-xl font-mono text-primary text-xs uppercase tracking-wider">
          {tool?.badge ?? 'Tool'}
        </p>
        <h2 className="m-0 font-semibold text-2xl">
          {tool?.title ?? 'Tool'} is coming soon.
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          {tool?.description ??
            'This tool is reserved in the developer toolkit and will be enabled in a later pass.'}
        </p>
        <div>
          <Button asChild variant="outline">
            <Link href="/jwt-decode">Back to JWT Decode</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
