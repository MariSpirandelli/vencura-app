import useSWR, { SWRConfiguration } from 'swr';

import config from '../../config';
import { parseParamsIntoQueryString } from '../../helpers/parseParamsIntoQueryString';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

export type FetchHook<T> = (
  ...args: any
) => [
  T,
  {
    loading: boolean;
    error: any;
    mutate?: (...args: any) => void;
    loadMore?: (...args: any) => void;
  }
];

interface FetchOptions extends RequestInit {
  params?: any;
}

const useFetch = <DataType>(
  path: string,
  fetchOptions: FetchOptions = {},
  swrOptions?: SWRConfiguration
) => {
  const dynamicContext = useDynamicContext()
  const { params, ...otherFetchOptions } = fetchOptions;

  const pathWithQueryString = params
    ? `${path}?${parseParamsIntoQueryString(params)}`
    : path;

  const fetcher = (url: RequestInfo | URL) =>
    fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${dynamicContext.authToken}`,
      },
      ...otherFetchOptions,
    }).then((r) => r.json());

  let swr = useSWR<DataType>(
    `${config.api.url}${pathWithQueryString}`,
    fetcher,
    swrOptions
  );

  let data = swr?.data;
  const error = (data as any)?.error || swr?.error;
  if ((data as any)?.error) {
    data = undefined;
  }

  return { loading: !swr.data && !swr.error, ...swr, data, error };
};

export default useFetch;
