import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/getProductById";
import { DetailProductCard } from "./DetailProductCard";
import type { ProductResponse } from "../../models/product";

export const DetailProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5,
  });

  const product = data.error ? null : data.data?.products;

  return <DetailProductCard product={product as ProductResponse} />;
};
