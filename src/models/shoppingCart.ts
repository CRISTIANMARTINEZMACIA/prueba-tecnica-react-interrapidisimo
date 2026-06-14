import type { ProductResponse } from "./product";

export interface ShoppingCart{
    product: ProductResponse;
    amount: number;
    subTotal?:number,
    tax?:number,
    total?:number,
}