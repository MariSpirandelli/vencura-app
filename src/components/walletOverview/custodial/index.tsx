import SimpleDialog from '@/components/dialog';
import TransactionHistory from '@/components/transactionHistory';
import useWallet from '@/hooks/api/useWallet';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import FileCopy from '@material-ui/icons/FileCopy';
import { useEffect, useState } from 'react';

const CustodialWallets: React.FC = () => {
  // transanction and sign result dialog controls
  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<string>('');
  const [dialogTitle, setDialogTile] = useState<string>('');

  // wallet info
  const [walletInfo, { loading: isWalletLoading }] = useWallet.useUserWallet();

  // sign and request transaction
  const [signedMessage, { loading: signingMessage, signMessage }] =
    useWallet.useSignMessage();
  const [
    transactionResult,
    { loading: requestingTransaction, error: transactionError, send },
  ] = useWallet.useSendTransaction();

  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (signedMessage) {
      setDialogTile('Signed message');
      setDialogValue(signedMessage);
      setOpen(true);
    }
  }, [signedMessage]);

  useEffect(() => {
    if (transactionError) {
      console.log(transactionError);
    }

    if (transactionResult && transactionResult.receipt) {
      setDialogTile('Transaction receipt');
      setDialogValue(transactionResult.receipt);
    }
  }, [transactionResult, transactionError]);

  const handleSignMessage = () => {
    if (signingMessage || !value) {
      return;
    }
    signMessage(value);
  };

  const handleSendTransaction = () => {
    if (requestingTransaction || !value || !walletInfo) {
      return;
    }

    send(walletInfo?.id, '0.0000000000001', value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyFullAddress = () => {
    navigator.clipboard.writeText(walletInfo?.address || '');
  };

  if (isWalletLoading) {
    return <>loading wallet...</>;
  }

  return (
    <Box className="mt-8 flex flex-col  w-full">
      <Box className="flex flex-row w-full justify-between">
        <Box className="flex flex-col flex-1">
          <Typography component="h5">
            Balance: ETH {walletInfo?.balance}
          </Typography>
          <div
            className="flex flex-row cursor-pointer"
            onClick={copyFullAddress}
            title="click to copy to clipboard"
          >
            <Typography
              gutterBottom
              component="h6"
              variant="body2"
              style={{
                maxWidth: 100,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {walletInfo?.address}
            </Typography>
            {walletInfo?.address && <FileCopy fontSize="inherit" />}
          </div>
        </Box>
        <Box className="flex flex-col justify-between">
          <div>
            <TextField
              id="outlined-basic"
              label="message/ address"
              variant="outlined"
              className="w-full"
              size="small"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <Button
              role="button"
              variant="outlined"
              color="primary"
              onClick={handleSignMessage}
            >
              {'Sign Message '}
            </Button>
            <Button
              role="button"
              variant="outlined"
              color="primary"
              onClick={handleSendTransaction}
            >
              {'Send transaction '}
            </Button>
          </div>
        </Box>
      </Box>
      <TransactionHistory />
      <SimpleDialog
        onClose={handleClose}
        open={open}
        value={dialogValue}
        title={dialogTitle}
      />
    </Box>
  );
};

export default CustodialWallets;
