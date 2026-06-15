import { Suspense } from "react";
import { Grid } from "@mui/material";
import { SkeletonGrid } from "../common/SkeletonGrid";
import { ProductList } from "./ProductList";

export const ProductPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Grid container spacing={2}>
            <SkeletonGrid amount={10} />
          </Grid>
        }
      >
        <ProductList />
      </Suspense>
    </>
  );
};
