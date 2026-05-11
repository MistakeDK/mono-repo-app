'use client';

import { useMemo, useState } from 'react';
import { Button } from '@mono/ui-components';
import { ToolPanel, ToolPane } from './tool-panel';
import type { ToolMessage } from './toolkit-types';
import { copyText, getErrorMessage, pretty, sampleJson } from './toolkit-utils';

export function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [space, setSpace] = useState(2);
  const [copyLabel, setCopyLabel] = useState('Copy');
  const formatted = useMemo(
    () => formatJsonInput(input, space),
    [input, space],
  );

  async function handleCopy() {
    await copyText(formatted.output);
    setCopyLabel('Copied');
    window.setTimeout(() => setCopyLabel('Copy'), 900);
  }

  return (
    <ToolPanel>
      <ToolPane
        actions={
          <>
            <Button
              onClick={() => {
                setInput(JSON.stringify(sampleJson));
                setSpace(2);
              }}
              size="sm"
              type="button"
              variant="outline"
            >
              Sample
            </Button>
            <Button
              onClick={() => setSpace(0)}
              size="sm"
              type="button"
              variant="outline"
            >
              Minify
            </Button>
            <Button
              onClick={() => {
                setInput('');
                setSpace(2);
              }}
              size="sm"
              type="button"
              variant="outline"
            >
              Clear
            </Button>
          </>
        }
        title="JSON input"
      >
        <textarea
          aria-label="JSON input"
          className="flex-1 bg-surface-sunken p-3.5 border-0 outline-none min-h-80 md:min-h-117.5 font-mono text-foreground placeholder:text-muted-foreground text-xs leading-relaxed resize-none"
          onChange={(event) => {
            setInput(event.target.value);
            setSpace(2);
          }}
          placeholder="Paste JSON here, then format or minify it."
          spellCheck={false}
          value={input}
        />
        <Message message={formatted.message} />
      </ToolPane>

      <ToolPane
        actions={
          <>
            <Button onClick={() => setSpace(2)} size="sm" type="button">
              Format
            </Button>
            <Button
              onClick={handleCopy}
              size="sm"
              type="button"
              variant="outline"
            >
              {copyLabel}
            </Button>
          </>
        }
        title="Formatted output"
      >
        <pre
          aria-live="polite"
          className="flex-1 bg-card m-0 p-3.5 min-h-80 md:min-h-117.5 overflow-auto font-mono text-foreground text-xs leading-relaxed whitespace-pre-wrap"
        >
          {formatted.output}
        </pre>
      </ToolPane>
    </ToolPanel>
  );
}

function formatJsonInput(input: string, space: number) {
  const value = input.trim();
  if (!value) {
    return {
      message: { text: 'Waiting for JSON.' },
      output: pretty({ status: 'ready' }),
    };
  }

  try {
    const parsed = JSON.parse(value);

    return {
      message: {
        text: space === 0 ? 'Valid JSON minified.' : 'Valid JSON formatted.',
      },
      output: JSON.stringify(parsed, null, space),
    };
  } catch (error) {
    return {
      message: { text: 'JSON parse error.', isError: true },
      output: pretty({ error: getErrorMessage(error) }),
    };
  }
}

function Message({ message }: { message: ToolMessage }) {
  return (
    <div
      className={`min-h-6 bg-surface-sunken px-3 pb-2.5 font-mono text-xs ${
        message.isError ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      {message.text}
    </div>
  );
}
