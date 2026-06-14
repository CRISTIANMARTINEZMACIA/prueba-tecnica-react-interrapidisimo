import { Grid, Typography } from "@mui/material";

export interface LabelInformationProps {
  title: string;
  value: string;
}

export const LabelInformation = ({ title, value }: LabelInformationProps) => {
  return (
    <Grid>
      <Typography>{title}</Typography>
      <Typography>{value}</Typography>
    </Grid>
  );
};
