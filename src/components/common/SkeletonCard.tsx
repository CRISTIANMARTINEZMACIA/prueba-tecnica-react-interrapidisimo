import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
} from "@mui/material";
import React from "react";

const SkeletonCardComponent = () => {
  return (
    <Card sx={{border: "2px solid #ccc"}}>
      <CardHeader
        title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
      />
      <Skeleton variant="rectangular" width={"100%"} height={194} />
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Skeleton height={10} width="40%" />
          <Skeleton height={10} width="20%" />
        </Stack>

        <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
        <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
        <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
        <Stack direction="row" spacing={1}>
          <Skeleton height={10} width="20%" />
          <Skeleton height={10} width="20%" />
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Skeleton height={10} width="10%" />
        <Skeleton height={10} width="10%" />
      </CardActions>
    </Card>
  );
};

export const SkeletonCard = React.memo(SkeletonCardComponent);