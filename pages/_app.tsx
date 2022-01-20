import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";
import NavBar from "../components/NavBar";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  const config = {
    multicallAddresses: { 1337: "0x5148b175A705620cE8F4f984fD72C6D19F6FB7b2" },
  };
  return (
    <RecoilRoot>
      <DAppProvider config={config}>
        <NavBar />
        <div className="mt-20">
          <Component {...pageProps} />
        </div>
      </DAppProvider>
    </RecoilRoot>
  );
}

export default MyApp;
