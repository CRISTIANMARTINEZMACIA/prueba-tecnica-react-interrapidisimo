import type { ProductResponse } from "../models/product";
import type { Response, Root } from "../models/response";
import api from "./api";

export const findProduct = async <T extends ProductResponse>(
  skip: number,
  search?: string,
  category?: string,
  limit?: string
): Promise<Response<T[]>> => {
  const params = new URLSearchParams({
    skip: skip.toString(),
  });

  if (limit) params.append("limit", limit);
  if (search) params.append("q", search);

  const endpoint = search ? "search" : "";
  const response = await api.get(`products/${endpoint}?${params.toString()}`);

  return {
    error: false,
    message: "Productos obtenidos correctamente",
    data: category
      ? {
          ...response.data,
          products: (response.data as Root<T[]>).products.filter(
            (item) => item.category == category
          ),
        }
      : response.data,
  };
};
