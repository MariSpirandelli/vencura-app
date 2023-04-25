import config from '@/config';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { useState } from 'react';

const usePostRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const dynamicContext = useDynamicContext();

  const postRequest = async (url: string, body: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${config.api.url}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dynamicContext.authToken}`,
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postRequest };
};

export default usePostRequest;
