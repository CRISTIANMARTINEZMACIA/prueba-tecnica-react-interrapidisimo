import type { Response, Root } from "../models/response";
import api from "./api";

export const findProduct = async (
  skip: number,
  search?: string,
  category?: string
): Promise<Response> => {
  const params = new URLSearchParams({
    skip: skip.toString(),
    limit: "12",
  });

  if (search) params.append("q", search);

  try {
    const endpoint = category ? `category/${category}` : search ? "search" : "";
    const response = await api.get(`products/${endpoint}?${params.toString()}`);

    return {
      error: false,
      message: "Productos obtenidos correctamente",
      data:
        category && search
          ? (response.data as Root).products.filter((item) =>
              item.title.includes(search)
            )
          : response.data,
    };
  } catch (error) {
    return {
      error: true,
      message:
        error instanceof Error
          ? error.message
          : "Error inesperado, contacta al administrador",
      data: null,
    };
  }
};
