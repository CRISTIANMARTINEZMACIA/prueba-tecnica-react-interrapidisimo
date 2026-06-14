import { useEffect } from "react";
import { findProduct } from "../services/findProducts";
import { ProductCard } from "./ProductCard";
import { Grid } from "@mui/material";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React from "react";
import { SkeletonGrid } from "./SkeletonGrid";
import { useSearchParams } from "react-router-dom";
import { FilterProductForm } from "./FilterProductForm";

export const Product = () => {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["products", search, category],
      queryFn: ({ pageParam }) => findProduct(pageParam, search, category),
      initialPageParam: 0,
      getNextPageParam: ({ data }) =>
        (data?.skip ?? 0) + (data?.limit ?? 0) < (data?.total ?? 0)
          ? (data?.skip ?? 0) + (data?.limit ?? 0)
          : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products =
    data?.pages.flatMap((page) => page.data?.products ?? []).filter(Boolean) ??
    [];

  return (
    <React.Fragment>
      <FilterProductForm />
      <hr />
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
