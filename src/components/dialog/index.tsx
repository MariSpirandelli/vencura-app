import { Dialog, DialogTitle, Typography } from '@material-ui/core';

interface Props {
  open: boolean;
  title: string;
  value: string;
  onClose: (value: string) => void;
}

const SimpleDialog: React.FC<Props> = (props: Props) => {
  const { onClose, value, title, open } = props;

  const handleClose = () => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <Typography className="p-4" gutterBottom component="h6" variant="body1" style={{wordWrap: "break-word"}}>
        {value}
      </Typography>
    </Dialog>
  );
};

export default SimpleDialog;
