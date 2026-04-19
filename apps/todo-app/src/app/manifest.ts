import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Tuduu - Todo App',
  short_name: '2du',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait-primary',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  categories: ['productivity'],
});

export default manifest;
