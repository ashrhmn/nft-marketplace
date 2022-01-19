import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DAppProvider } from '@usedapp/core'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }: AppProps) {
  const config = {
    multicallAddresses: { 1337: "0x22Fb9Dec6E428D96C28A2CF60aEd223D30820B60" }
  }
  return <DAppProvider config={config}>
    <NavBar />
    <div className="mt-20">
      <Component {...pageProps} />
    </div>
  </DAppProvider>
}

export default MyApp
