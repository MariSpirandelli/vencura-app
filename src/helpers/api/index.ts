import debug from '../debug';
import config from '../../config';
import { parseParamsIntoQueryString } from '../parseParamsIntoQueryString';

interface Options extends RequestInit {
  params?: any;
}

const fetchApi = async (path: string, options: Options = {}) => {
  const { params, ...otherOptions } = options;

  const pathWithQueryString = params
    ? `${path}?${parseParamsIntoQueryString(params)}`
    : path;

  try {
    const response = await fetch(`${config.api.url}${pathWithQueryString}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      ...otherOptions,
    });

    const isJson = response.headers
      .get('content-type')
      ?.includes('application/json');

    return isJson ? response.json() : response;
  } catch (err) {
    debug.error('[fetchApi]', { pathWithQueryString, err });
  }

  return;
};

const api = {
  get: (path: string, options?: Options) =>
    fetchApi(path, { ...options, method: 'GET' }),
  post: (path: string, options?: Options) =>
    fetchApi(path, { ...options, method: 'POST' }),
  put: (path: string, options?: Options) =>
    fetchApi(path, { ...options, method: 'PUT' }),
  delete: (path: string, options?: Options) =>
    fetchApi(path, { ...options, method: 'DELETE' }),
};

export default api;
