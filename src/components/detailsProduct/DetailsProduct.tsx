import { DetailProductCard } from "./DetailProductCard";
import type { ProductResponse } from "../../models/product";
import { useDetailProduct } from "../../hooks/useDetailProduct";

export const DetailProduct = () => {
 
  const { product } = useDetailProduct();

  return product === undefined ? null : (
    <DetailProductCard product={product as ProductResponse} />
  );
};
