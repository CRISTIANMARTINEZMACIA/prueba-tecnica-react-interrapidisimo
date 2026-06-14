import type { ProductResponse } from "./product";

export interface ShoppingCart{
    product: ProductResponse;
    amount: number;
}