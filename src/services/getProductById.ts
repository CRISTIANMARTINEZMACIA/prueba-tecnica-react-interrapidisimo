import type { Response } from "../models/response";
import api from "./api";

export const getProductById = async (id?: string): Promise<Response> => {

  if (!id){
return {
  error: true,
  message: 'id indefinido',
  data: null,
}
  }
  try {
    const response = await api.get(`products/${id}`);

    const data =
      response.data.message === null
        ? {
            error: false,
            message: "Productos obtenidos correctamente",
            data: response.data,
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
