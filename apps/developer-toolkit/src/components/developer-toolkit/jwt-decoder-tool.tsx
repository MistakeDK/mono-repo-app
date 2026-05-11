'use client';

import { useMemo, useState } from 'react';
import { Button } from '@mono/ui-components';
import { ToolPanel, ToolPane } from './tool-panel';
import type { ToolMessage } from './toolkit-types';
import {
  copyText,
  decodeBase64Url,
  getErrorMessage,
  isRecord,
  pretty,
  sampleJwt,
} from './toolkit-utils';

const emptyJwtOutput = { header: null, payload: null };
const claimKeys = ['sub', 'name', 'role', 'iss', 'aud', 'iat', 'exp'] as const;

export function JwtDecoderTool() {
  const [input, setInput] = useState('');
  const [copyLabel, setCopyLabel] = useState('Copy');

  const decoded = useMemo(() => decodeJwtInput(input), [input]);

  async function handleCopy() {
    await copyText(decoded.output);
    setCopyLabel('Copied');
    window.setTimeout(() => setCopyLabel('Copy'), 900);
  }

  return (
    <ToolPanel>
      <ToolPane
        actions={
          <>
            <Button
              onClick={() => setInput(sampleJwt)}
              size="sm"
              type="button"
              variant="outline"
            >
              Sample
            </Button>
            <Button
              onClick={() => setInput('')}
              size="sm"
              type="button"
              variant="outline"
            >
              Clear
            </Button>
          </>
        }
        title="Token input"
      >
        <textarea
          aria-label="JWT input"
          className="flex-1 bg-surface-sunken p-3.5 border-0 outline-none font-mono text-foreground placeholder:text-muted-foreground text-xs leading-relaxed resize-none"
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste a JWT here. The header and payload will decode locally."
          spellCheck={false}
          value={input}
        />
        <Message message={decoded.message} />
      </ToolPane>

      <ToolPane
        actions={
          <Button
            onClick={handleCopy}
            size="sm"
            type="button"
            variant="outline"
          >
            {copyLabel}
          </Button>
        }
        title="Decoded output"
      >
        <pre
          aria-live="polite"
          className="flex-2 bg-card m-0 p-3.5 min-h-0 overflow-auto overflow-y-auto font-mono text-foreground text-xs leading-relaxed whitespace-pre-wrap"
        >
          {decoded.output}
        </pre>
        <Claims payload={decoded.payload} />
      </ToolPane>
    </ToolPanel>
  );
}

function decodeJwtInput(input: string) {
  const value = input.trim();
  if (!value) {
    return {
      message: { text: 'Waiting for a token.' },
      output: pretty(emptyJwtOutput),
      payload: null,
    };
  }

  const parts = value.split('.');
  if (parts.length < 2) {
    return {
      message: { text: 'Invalid token shape.', isError: true },
      output: pretty({
        error: 'JWT must include header and payload segments.',
      }),
      payload: null,
    };
  }

  try {
    const header = JSON.parse(decodeBase64Url(parts[0]));
    const payload = JSON.parse(decodeBase64Url(parts[1]));

    return {
      message: {
        text: 'Decoded locally. Signature is displayed but not verified.',
      },
      output: pretty({ header, payload, signature: parts[2] || null }),
      payload: isRecord(payload) ? payload : null,
    };
  } catch (error) {
    return {
      message: { text: 'Could not decode this token.', isError: true },
      output: pretty({ error: getErrorMessage(error) }),
      payload: null,
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

function Claims({ payload }: { payload: Record<string, unknown> | null }) {
  if (!payload) {
    return null;
  }

  const visibleClaims = claimKeys.filter((key) =>
    Object.prototype.hasOwnProperty.call(payload, key),
  );

  if (visibleClaims.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 gap-2.5 grid bg-surface-raised p-3 border-border border-t min-h-0 overflow-y-auto">
      {visibleClaims.map((key) => (
        <div
          className="flex sm:flex-row flex-col gap-1 sm:gap-3 -mx-3 px-2 pb-2.5 last:pb-0 border-border border-b last:border-b-0 font-mono text-xs"
          key={key}
        >
          <span className="sm:w-40 text-muted-foreground shrink-0">{key}</span>
          <span>
            {typeof payload[key] === 'object'
              ? pretty(payload[key])
              : String(payload[key])}
          </span>
        </div>
      ))}
    </div>
  );
}
