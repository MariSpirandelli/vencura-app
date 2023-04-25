import useTransaction from '@/hooks/api/useTransaction';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { History } from '@material-ui/icons';


const TransactionHistory: React.FC = () => {
  const [transactions, { loading, error }] = useTransaction();

  return (
    <div className="my-6">
      <Typography component="h6">
        <History /> Transactions History
      </Typography>

      <TableContainer component={Paper} className="my-4">
        <Table aria-label="transaction history">
          <TableHead>
            <TableRow>
              <TableCell>Send To Address</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!transactions?.length ? (
              <TableRow key={`transaction_empty`}>
                <TableCell component="th" scope="row" rowSpan={2}>
                  {loading? 'loading': 'No transaction found'}
                </TableCell>
              </TableRow>
            ) : (
              transactions?.map((transaction, i) => (
                <TableRow key={`transaction_${i}`}>
                  <TableCell component="th" scope="row">
                    {transaction.toWalletAddress}
                  </TableCell>
                  <TableCell align="right">{transaction.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionHistory;
