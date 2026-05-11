import { DeveloperToolkitShell } from '../components/developer-toolkit/developer-toolkit-shell';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <DeveloperToolkitShell>{children}</DeveloperToolkitShell>
      </body>
    </html>
  );
}
