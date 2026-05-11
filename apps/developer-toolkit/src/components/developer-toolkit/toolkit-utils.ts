import type { ToolDefinition } from './toolkit-types';

export const tools: ToolDefinition[] = [
  {
    id: 'jwt-decode',
    title: 'JWT Decode',
    badge: 'Decode',
    description: 'Inspect header, payload, and common claims locally.',
    category: 'decode',
    href: '/jwt-decode',
    searchTerms: 'jwt decode token payload claims',
  },
  {
    id: 'json-formatter',
    title: 'JSON Parse',
    badge: 'Format',
    description: 'Format, minify, and validate JSON snippets quickly.',
    category: 'format',
    href: '/json-formatter',
    searchTerms: 'json parse format minify validate',
  },
  {
    id: 'image-to-base64',
    title: 'Image to Base64',
    badge: 'Encode',
    description: 'Convert local images into embeddable Base64 strings.',
    category: 'encode',
    href: '/image-to-base64',
    searchTerms: 'image to base64 encode image',
    disabled: true,
  },
  {
    id: 'url-encode',
    title: 'URL Encode',
    badge: 'Encode',
    description: 'Encode and decode URL-safe request values.',
    category: 'encode',
    href: '/url-encode',
    searchTerms: 'url encode decode query string',
    disabled: true,
  },
  {
    id: 'timestamp',
    title: 'Timestamp',
    badge: 'Generate',
    description: 'Convert Unix timestamps into readable dates.',
    category: 'generate',
    href: '/timestamp',
    searchTerms: 'timestamp unix date generate convert',
    disabled: true,
  },
];

export const sampleJwt = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  'eyJzdWIiOiJkZXZlbG9wZXIiLCJuYW1lIjoiTmd1eWVuIFRoYW5oIERhdCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNDY5NDQwMCwiZXhwIjoxNzE0Nzg4MDAwfQ',
  'signature',
].join('.');

export const sampleJson = {
  project: 'developer-toolkit',
  tools: ['jwt decode', 'json parse', 'json format'],
  owner: 'Nguyen Thanh Dat',
  runtime: {
    mode: 'client-side',
    uploads: false,
  },
};

export function pretty(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown error';
}

export function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    '=',
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

export async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement('textarea');
  helper.value = text;
  helper.setAttribute('readonly', '');
  helper.style.position = 'fixed';
  helper.style.inset = '0 auto auto 0';
  helper.style.opacity = '0';
  document.body.append(helper);
  helper.select();
  document.execCommand('copy');
  helper.remove();
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
