import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'EduSpin - Spin to Learn, Earn to Win',
  description: 'Daily educational challenges with real rewards. Transform learning into an engaging habit.',
  keywords: ['education', 'learning', 'gamification', 'rewards', 'blockchain', 'base'],
  authors: [{ name: 'EduSpin Team' }],
  openGraph: {
    title: 'EduSpin - Spin to Learn, Earn to Win',
    description: 'Daily educational challenges with real rewards',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduSpin - Spin to Learn, Earn to Win',
    description: 'Daily educational challenges with real rewards',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
