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
  icons: [
    {
      src: '/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: '/icon-maskable-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: '/icon-maskable-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],

  shortcuts: [
    {
      name: 'New Todo',
      short_name: 'New',
      description: 'Create a new todo item',
      url: '/?action=new',
      icons: [
        {
          src: '/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
      ],
    },
  ],
  categories: ['productivity'],
});

export default manifest;
