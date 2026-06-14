import { Grid } from "@mui/material";
import { SkeletonCard } from "./SkeletonCard";

export const SkeletonGrid = ({ amount = 4 }: { amount?: number }) => (
  <>
    {Array(amount)
      .fill(0)
      .map((_, i) => (
        <Grid key={`init-s-${i}`} size={{ xs: 12, md: 3 }}>
          <SkeletonCard />
        </Grid>
      ))}
  </>
);
