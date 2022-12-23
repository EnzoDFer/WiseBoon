import '../utils/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { BudgetsProvider } from '../contexts/BudgetsContext';
import IsAuthorized from '../components/providers/IsAuthorized';

export default function App(
  { Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
          <Component {...pageProps} />
    </SessionProvider>
  );
}
