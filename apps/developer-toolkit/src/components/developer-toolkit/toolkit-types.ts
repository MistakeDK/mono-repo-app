export type ToolCategory = 'decode' | 'encode' | 'format' | 'generate';

export type ToolId =
  | 'jwt-decode'
  | 'json-formatter'
  | 'image-to-base64'
  | 'url-encode'
  | 'timestamp';

export interface ToolDefinition {
  id: ToolId;
  title: string;
  badge: string;
  description: string;
  category: ToolCategory;
  href: string;
  searchTerms: string;
  disabled?: boolean;
}

export interface ToolMessage {
  text: string;
  isError?: boolean;
}
