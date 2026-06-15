import type { ProductResponse } from "../models/product";
import type { Response, Root } from "../models/response";
import api from "./api";

export const findProduct = async <T extends ProductResponse>(
  skip: number,
  search?: string,
  category?: string
): Promise<Response<T[]>> => {
  const params = new URLSearchParams({
    skip: skip.toString(),
    limit: "12",
  });

  if (search) params.append("q", search);

  const endpoint = category ? `category/${category}` : search ? "search" : "";
  const response = await api.get(`products/${endpoint}?${params.toString()}`);

  return {
    error: false,
    message: "Productos obtenidos correctamente",
    data:
      category && search
        ? (response.data as Root<T[]>).products.filter((item) =>
            item.title.includes(search)
          )
        : response.data,
  };
};
