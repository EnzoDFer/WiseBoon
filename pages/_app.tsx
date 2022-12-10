import '../utils/globals.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { BudgetsProvider } from '../contexts/BudgetsContext';

export default function App(
  { Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <BudgetsProvider>
        <Component {...pageProps} />
      </BudgetsProvider>
    </SessionProvider>
  );
}
