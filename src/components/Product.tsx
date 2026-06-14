import { useEffect, useState, type FocusEvent } from "react";
import { findProduct } from "../services/findProducts";
import { ProductCard } from "./ProductCard";
import { Grid, TextField } from "@mui/material";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React from "react";
import { SkeletonGrid } from "./SkeletonGrid";
import { useSearchParams } from "react-router-dom";

export const Product = () => {
  const { ref, inView } = useInView();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const category  = searchParams.get("category") ?? "";
  const [filterSearch, setFilterSearch] = useState(search);
  const [filterCategory, setFilterCategory] = useState(category);

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

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const handleFocusCategory = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Buscar productos..."
            variant="outlined"
            fullWidth
            value={filterSearch}
            onBlur={handleFocus}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFilterSearch(event.target.value)
            }
            style={{ marginBottom: "20px" }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Buscar categoría..."
            variant="outlined"
            fullWidth
            value={filterCategory}
            onBlur={handleFocusCategory}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFilterCategory(event.target.value)
            }
            style={{ marginBottom: "20px" }}
          />
        </Grid>
      </Grid>
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
