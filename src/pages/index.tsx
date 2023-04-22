import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { useEffect, useState } from 'react';
import apiLogin from '@/helpers/api/login';

export default function Home() {
  const dynamicContext = useDynamicContext();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  useEffect(() => {
    if (!dynamicContext.isAuthenticated) {
      return;
    }
    setIsAuthenticated(dynamicContext.isAuthenticated);
    async function handleLogin(): Promise<void> {
      if (!dynamicContext.authToken) {
        return;
      }
      await apiLogin(dynamicContext.authToken);
    }

    handleLogin();
  }, [dynamicContext, dynamicContext.isAuthenticated]);

  const loadComponent = () => {
    if (!isAuthenticated) {
      return <>welcome</>;
    }

    return <>logged - {dynamicContext.authToken}</>;
  };

  return (
    <main className="container h-screen bg-white mx-auto my-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {loadComponent()}
    </main>
  );
}
