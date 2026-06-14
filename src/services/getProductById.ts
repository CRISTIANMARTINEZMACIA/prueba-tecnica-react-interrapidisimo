import type { ProductResponse } from "../models/product";
import type { Response } from "../models/response";
import api from "./api";

export const getProductById = async <T extends ProductResponse>(id?: string): Promise<Response<T>> => {
  if (!id) {
    return {
      error: true,
      message: "id indefinido",
      data: null,
    };
  }
  try {
    const response = await api.get(`products/${id}`);

    console.log(response.data);
    console.log(response.data.id != null);
    const data =
      response.data.id != null
        ? {
            error: false,
            message: "Productos obtenidos correctamente",
            data: {
              products: response.data,
            },
          }
        : {
            error: true,
            message: response.data.message,
            data: null,
          };
    return data;
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
