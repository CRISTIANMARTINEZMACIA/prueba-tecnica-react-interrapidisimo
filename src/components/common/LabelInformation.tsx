import { Grid, Typography } from "@mui/material";

export interface LabelInformationProps {
  title: string;
  value: string;
  testId?: string;
}

export const LabelInformation = ({ title, value, testId }: LabelInformationProps) => {
  return (
    <Grid>
      <Typography sx={{fontWeight: "bold"}}>{title}</Typography>
      <Typography data-testid={testId || title}>{value}</Typography>
    </Grid>
  );
};
