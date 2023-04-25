import { v4 as uuidv4 } from 'uuid';
import useFetch from './useFetch';
import usePostRequest from './usePostRequest';

type FetchTransactionHookReturn = [
  ITransaction[] | undefined,
  {
    loading: boolean;
    error: any;
    mutateTransactions: (transaction: ITransaction) => void
  }
];

const useTransaction = (): FetchTransactionHookReturn => {
  const { loading, data, error, mutate } = useFetch<ITransaction[]>(`/api/transactions/`);

  const mutateTransactions = async (transaction: ITransaction) => {
      mutate([...(data || []), transaction], false);
  }

  return [data, { loading, error, mutateTransactions }];
};

export default useTransaction;
