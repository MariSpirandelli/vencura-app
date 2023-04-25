import useWallet from '@/hooks/api/useWallet';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import TabPanel from '../layout/tabPanel';
import CustodialWallets from './custodial';

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const WalletOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const [walletInfo, { loading: isWalletLoading }] = useWallet.useUserWallet();
  const [signedMessage, { loading: signingMessage, signMessage }] =
    useWallet.useSignMessage();
  const [transactionResult, { loading: requestingTransaction, send }] =
    useWallet.useSendTransaction();
  const [message, setMessage] = useState<string>();
  const [transaction, setTransaction] = useState<ITransaction>();

  const handleChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (signedMessage) {
      setMessage(signedMessage);
    }
  }, [signedMessage]);

  useEffect(() => {
    if (transactionResult) {
      setTransaction(transactionResult);
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

  if (isWalletLoading) {
    return <>loading wallet...</>;
  }

  return (
    <>
      <Box className='w-full'>
        <Box className='flex justify-between'>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="products tab list"
          >
            <Tab value={1} label="Ventura Wallets" {...a11yProps} />
            <Tab value={2} label="Linked Wallets" {...a11yProps} />
          </Tabs>
        </Box>
        <TabPanel index={1} value={activeTab}>
          <CustodialWallets />
        </TabPanel>
        <TabPanel index={2} value={activeTab}>
          <Typography variant="h1" component="h1">
            Yet to come
          </Typography>
        </TabPanel>
      </Box>
    </>
  );
};

export default WalletOverview;
