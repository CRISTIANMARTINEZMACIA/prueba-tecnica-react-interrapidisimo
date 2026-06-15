import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { Suspense } from "react";
import { useShoppingCartStore } from "../hooks/useShoppingCartStore";
import { getProductById } from "../services/getProductById";
import { DetailProduct } from "../components/detailsProduct/DetailsProduct";
import { ShoppingCart } from "../components/shoppingCard/ShoppingCart";

vi.mock("../services/getProductById", () => ({
  getProductById: vi.fn(),
}));

const mockProductResponse = {
  error: false,
  message: "Producto encontrado",
  data: {
    products: {
      id: 99,
      title: "Teclado Mecánico",
      price: 100,
      stock: 10,
      images: ["teclado.jpg"],
      category: "Accesorios",
      brand: "Keychron",
      rating: 4.5,
      reviews: [],
      description: "RGB Backlit",
      warrantyInformation: "2 years",
      shippingInformation: "Ships in 2 days",
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
    },
  },
};

describe("Integration Test: Añadir al carrito -> Ver total actualizado", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    useShoppingCartStore.getState().clearCart();
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("debería completar exitosamente el flujo de compra y actualizar los totales en el Drawer", async () => {
    const user = userEvent.setup();
    vi.mocked(getProductById).mockResolvedValue(mockProductResponse);

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/products/99"]}>
          <Suspense fallback={<div>Cargando...</div>}>
            <DetailProduct />
          </Suspense>
          <ShoppingCart open={false} handleClose={() => {}} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const productTitle = await screen.findByText("Teclado Mecánico");
    expect(productTitle).toBeInTheDocument();

    const quantityInput = screen.getByRole("spinbutton", {
      name: /añadir cantidad/i,
    });

    await user.clear(quantityInput);
    await user.type(quantityInput, "2");

    expect(screen.getByText("200.00")).toBeInTheDocument();

    const addButton = screen.getByRole("button", {
      name: /añadir al carrito/i,
    });
    await user.click(addButton);

    rerender(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/products/99"]}>
          <Suspense fallback={<div>Cargando...</div>}>
            <DetailProduct />
          </Suspense>
          <ShoppingCart open={true} handleClose={() => {}} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
     
      const productItem = screen.getByTestId("cart-product-item");

      expect(
        within(productItem).getByTestId("cart-product-item-subtotal")
      ).toHaveTextContent("200.00");
      expect(
        within(productItem).getByTestId("cart-product-item-tax")
      ).toHaveTextContent("38");
      expect(
        within(productItem).getByTestId("cart-product-item-total")
      ).toHaveTextContent("238");
    });

    expect(screen.getByText("En carrito")).toBeInTheDocument();
  });
});
