import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { findProduct } from "../services/findProducts";
import { useMemo } from "react";

export const useProduct = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["products", search, category],
      queryFn: ({ pageParam }) =>
        findProduct(pageParam, search, category, "12"),
      initialPageParam: 0,
      getNextPageParam: ({ data }) =>
        (data?.skip ?? 0) + (data?.limit ?? 0) < (data?.total ?? 0)
          ? (data?.skip ?? 0) + (data?.limit ?? 0)
          : undefined,
    });

  const products = useMemo(() => {
    return (
      data?.pages
        .flatMap((page) => page.data?.products ?? [])
        .filter(Boolean) ?? []
    );
  }, [data]);

  return { products, isFetchingNextPage, hasNextPage, fetchNextPage };
};