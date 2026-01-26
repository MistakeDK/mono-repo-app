export type UUID = string; // "550e8400-e29b-41d4-a716-446655440000"
export type Email = string; // user@example.com
export type URLString = string; // https://example.com
export type PhoneNumber = string; // +84xxxxxxxx
export type Slug = string; // my-article-title
export type CurrencyCode = string; // "USD", "VND"
export type Locale = string; // "vi-VN", "en-US"
export type Timezone = string; // "Asia/Ho_Chi_Minh"

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type ValueOf<T> = T[keyof T];
