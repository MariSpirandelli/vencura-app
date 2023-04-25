import { Box } from "@material-ui/core";


interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<Props> = ({
  children,
  value,
  index,
  ...other
}: Props) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
