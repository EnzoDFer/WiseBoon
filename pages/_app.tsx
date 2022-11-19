import '../utils/globals.scss'
import type { AppProps } from 'next/app'
import { HomeWrapper } from '../components/providers/HomeWrapper'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HomeWrapper>
      <Component {...pageProps} />
    </HomeWrapper>
  );
}
