'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Input } from '@mono/ui-components';
import { ToolCard } from './tool-card';
import type { ToolCategory } from './toolkit-types';
import { tools } from './toolkit-utils';

type CategoryFilter = ToolCategory | 'all';

export function ToolNavigation() {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesQuery =
        !normalizedQuery ||
        `${tool.title} ${tool.description} ${tool.searchTerms}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === 'all' || tool.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [category, query]);

  return (
    <>
      <div className="flex md:flex-row flex-col gap-2.5 mb-3">
        <Input
          aria-label="Search tools"
          autoComplete="off"
          className="flex-1 bg-surface-sunken shadow-none px-3 border-border rounded-md h-10.5"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tools..."
          type="search"
          value={query}
        />
        <select
          aria-label="Filter tools by category"
          className="bg-surface-sunken px-3 border border-border focus:border-primary/60 rounded-md outline-none focus:ring-3 focus:ring-primary/20 w-full md:w-55 h-10.5 text-foreground"
          onChange={(event) =>
            setCategory(event.target.value as CategoryFilter)
          }
          value={category}
        >
          <option value="all">All categories</option>
          <option value="decode">Decode</option>
          <option value="encode">Encode</option>
          <option value="generate">Generate</option>
          <option value="format">Format</option>
        </select>
      </div>

      {filteredTools.length > 0 ? (
        <div className="gap-2.5 grid sm:grid-cols-2 lg:grid-cols-5 mb-4.5">
          {filteredTools.map((tool) => (
            <ToolCard
              active={pathname === tool.href}
              key={tool.id}
              tool={tool}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface-sunken mb-4.5 px-3.5 py-3 border border-border border-dashed rounded-md font-mono text-muted-foreground text-xs">
          No tools match this search and category.
        </div>
      )}
    </>
  );
}
