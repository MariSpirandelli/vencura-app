import { v4 as uuidv4 } from 'uuid';
import useFetch from './useFetch';
import usePostRequest from './usePostRequest';

type FetchUserWalletHookReturn = [
  IUserWallet | undefined,
  {
    loading: boolean;
    error: any;
  }
];

const useUserWallet = (): FetchUserWalletHookReturn => {
  const { loading, data, error } = useFetch<IUserWallet>(`/api/wallets/`);

  return [data, { loading, error }];
};

type SignMessageHookReturn = [
  string | null,
  {
    loading: boolean;
    error: any;
    signMessage: (message: string) => void;
  }
];

const useSignMessage = (): SignMessageHookReturn => {
  const { data, error, loading, postRequest } = usePostRequest();

  const signMessage = async (message: string) => {
    const body = {
      message,
    };

    return postRequest(`/api/wallets/sign/`, body);
  };

  return [data, { loading, error, signMessage }];
};

type RequestTransactionHookReturn = [
  ITransaction | null,
  {
    loading: boolean;
    error: any;
    send: (
      fromUserWalletId: number,
      amount: string,
      toWalletAddress: string
    ) => void;
  }
];
const useSendTransaction = (): RequestTransactionHookReturn => {
  const { data, error, loading, postRequest } = usePostRequest();

  const send = (
    fromUserWalletId: number,
    amount: string,
    toWalletAddress: string
  ) => {
    const body = {
      idempotencyKey: uuidv4(),
      fromUserWalletId,
      amount,
      toWalletAddress,
    };

    return postRequest(`/api/wallets/transaction`, body);
  };

  return [data, { loading, error, send }];
};

const useWallet = { useUserWallet, useSignMessage, useSendTransaction };
export default useWallet;
