declare interface ITransaction {
  id: number;
  fromUserWalletId: number;
  toWalletAddress: string;
  amount: string;
  receipt?: string;
  status?: TransactionStatus;
  failReason?: string;
}
