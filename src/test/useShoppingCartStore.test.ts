import { describe, it, expect, beforeEach } from "vitest";
import { useShoppingCartStore } from "../hooks/useShoppingCartStore";
import type { ProductResponse } from "../models/product";

const mockProduct: ProductResponse = {
  id: 1,
  title: "Laptop Gamer",
  price: 1000,
  stock: 5,
  images: ["laptop.jpg"],
  category: "Tech",
  brand: "BrandX",
  rating: 5,
  reviews: [],
  description: "High end laptop",
  warrantyInformation: "1 year",
  shippingInformation: "Free shipping",
  discountPercentage: 0,
  tags: [],
  sku: "",
  weight: 0,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },
  availabilityStatus: "",
  returnPolicy: "",
  minimumOrderQuantity: 0,
  meta: {
    createdAt: "",
    updatedAt: "",
    barcode: "",
    qrCode: "",
  },
  thumbnail: "",
};

describe("Unit Test: useShoppingCartStore", () => {
  beforeEach(() => {
    useShoppingCartStore.getState().clearCart();
  });

  it("debería añadir un producto nuevo calculando subtotal, IVA y total", () => {
    const store = useShoppingCartStore.getState();

    store.addToCart({ product: mockProduct, amount: 2 });

    const cart = useShoppingCartStore.getState().shoppingCart;
    expect(cart).toHaveLength(1);
    expect(cart[0].amount).toBe(2);
    expect(cart[0].subTotal).toBe(2000);
    expect(cart[0].tax).toBe(380);
    expect(cart[0].total).toBe(2380);
  });

  it("debería acumular montos y totales si el producto ya existe en el carrito", () => {
    const store = useShoppingCartStore.getState();

    
    store.addToCart({ product: mockProduct, amount: 1 });
    store.addToCart({ product: mockProduct, amount: 2 });

    const cart = useShoppingCartStore.getState().shoppingCart;
    expect(cart).toHaveLength(1);
    expect(cart[0].amount).toBe(3);
    expect(cart[0].subTotal).toBe(3000);
    expect(cart[0].tax).toBe(570);
    expect(cart[0].total).toBe(3570);
  });
});
