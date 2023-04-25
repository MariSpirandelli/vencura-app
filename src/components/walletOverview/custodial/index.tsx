import SimpleDialog from '@/components/dialog';
import useWallet from '@/hooks/api/useWallet';
import { Box, Button, Dialog, DialogTitle, Typography } from '@material-ui/core';
import FileCopy from '@material-ui/icons/FileCopy';
import { useEffect, useState } from 'react';

const CustodialWallets: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<string>('');
  const [dialogTitle, setDialogTile] = useState<string>('');

  const [walletInfo, { loading: isWalletLoading }] = useWallet.useUserWallet();
  const [signedMessage, { loading: signingMessage, signMessage }] =
    useWallet.useSignMessage();
  const [transactionResult, { loading: requestingTransaction, send }] =
    useWallet.useSendTransaction();

  useEffect(() => {
    if (signedMessage) {
      setDialogTile('Signed message');
      setDialogValue(signedMessage);
      setOpen(true);
    }
  }, [signedMessage]);

  useEffect(() => {
    if (transactionResult && transactionResult.receipt ) {
      setDialogTile('Transaction receipt');
      setDialogValue(transactionResult.receipt);
    }
  }, [transactionResult]);

  const handleSignMessage = () => {
    if (signingMessage) {
      return;
    }
    signMessage('Hello World');
  };

  const handleSendTransaction = () => {
    if (requestingTransaction) {
      return;
    }

    send(1, '0', '0x633DEA45D20E487aA50f13cC3A36904D1345776E');
  };

  const handleClose = () => {
    setOpen(false);
  }

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
          <div className="flex flex-row cursor-pointer" onClick={copyFullAddress} title="click to copy to clipboard">
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
            {walletInfo?.address && <FileCopy fontSize="inherit"/>}
          </div>
        </Box>
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
      </Box>
      <SimpleDialog onClose={handleClose} open={open} value={dialogValue} title={dialogTitle}/>
    </Box>
  );
};

export default CustodialWallets;
