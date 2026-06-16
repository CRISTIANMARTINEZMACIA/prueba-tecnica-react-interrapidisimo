import { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Box, Grid } from "@mui/material";
import { useInView } from "react-intersection-observer";
import React from "react";
import { SkeletonGrid } from "../common/SkeletonGrid";
import { FilterProductForm } from "./FilterProductForm";
import { useProduct } from "../../hooks/useProduct";

export const ProductList = () => {
  const { ref, inView} = useInView();
  const { products, isFetchingNextPage, hasNextPage, fetchNextPage } = useProduct();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <React.Fragment>
      <FilterProductForm />
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Grid container spacing={2}>
          {products.map((item) => {
            return (
              <Grid key={item.id} size={{ xs: 12, md: 3 }}>
                <ProductCard product={item} />
              </Grid>
            );
          })}
          {isFetchingNextPage && <SkeletonGrid />}
        </Grid>
      </Box>
      <div
        ref={ref}
        style={{
          height: "50px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      ></div>
    </React.Fragment>
  );
};
