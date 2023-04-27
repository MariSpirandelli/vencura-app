import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { useEffect, useState } from 'react';
import apiLogin from '@/helpers/api/login';
import Image from 'next/image';
import WalletOverview from '@/components/walletOverview';

export default function Home() {
  const dynamicContext = useDynamicContext();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  useEffect(() => {
    if (!dynamicContext.isAuthenticated) {
      setIsAuthenticated(false);
    }
    setIsAuthenticated(dynamicContext.isAuthenticated);
    async function handleLogin(): Promise<void> {
      if (!dynamicContext.authToken) {
        return;
      }
      await apiLogin(dynamicContext.authToken);
    }

    handleLogin();
  }, [dynamicContext.isAuthenticated, dynamicContext.authToken]);

  if (!isAuthenticated) {
    return (
      <main className="container h-screen bg-white mx-auto my-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="flex-col text-sky-600 text-center">
          <Image
            src="/assets/img/welcome.svg"
            alt="Welcome image with a financial service graph"
            width={650}
            height={100}
          />
          <p className="text-2xl font-extrabold">Welcome to Vencura!</p>
          <p className="text-xl font-bold">
            Your Safe and reliable financial service for web3 world.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container h-screen my-8 bg-white mx-auto px-8 sm:px-6 lg:px-8 flex">
      <WalletOverview />
    </main>
  );
}
