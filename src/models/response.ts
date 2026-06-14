export interface Response<T>{
  error: boolean;
  message: string;
  data: Root<T> | null;
}

export interface Root<T> {
  products: T;
  total?: number;
  skip?: number;
  limit?: number;
}
