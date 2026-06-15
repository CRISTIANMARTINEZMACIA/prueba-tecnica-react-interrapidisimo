import type { ProductResponse } from "../models/product";
import type { Response } from "../models/response";
import api from "./api";

export const getProductById = async <T extends ProductResponse>(
  id?: string
): Promise<Response<T>> => {
  if (!id) {
    return {
      error: true,
      message: "id indefinido",
      data: null,
    };
  }
  const response = await api.get(`products/${id}`);

  
  const data =
    response.data.id != null
      ? {
          error: true,
          message: "Producto encontrado",
          data: response.data,
        }
      : {
          error: true,
          message: response.data.message,
          data: null,
        };
  return data;
};
