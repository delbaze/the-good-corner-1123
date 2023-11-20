import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  //Imaginez charger la Layout ici sans perdre <Component {...pageProps} />
  return <Component {...pageProps} />
}
