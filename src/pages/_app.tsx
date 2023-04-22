import Header from '@/components/layout/header';
import config from '@/config';
import '@/styles/globals.css';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DynamicContextProvider
        settings={{
          appLogoUrl:
            'https://upload.wikimedia.org/wikipedia/commons/3/34/Examplelogo.svg',
          appName: 'Vencura',
          environmentId: config.dynamic.environmentId,
          multiWallet: true,
        }}
      >
        <Header /> 
        <Component {...pageProps} />
      </DynamicContextProvider>
    </>
  );
}
