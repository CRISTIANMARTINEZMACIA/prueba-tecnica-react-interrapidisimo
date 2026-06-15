import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import type { ProductResponse } from "../../models/product";
import type { ShoppingCart } from "../../models/shoppingCart";
import { LabelInformation } from "../common/LabelInformation";
import { useShoppingCartStore } from "../../hooks/useShoppingCartStore";
import { ProcessSnackBar } from "../common/ProcessSnackBar";

export const ShoppingCartAction = ({
  product,
}: {
  product: ProductResponse;
}) => {
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const addToCart = useShoppingCartStore((state) => state.addToCart);

  const usedStock = useShoppingCartStore((state) => {
    return state.shoppingCart.reduce((acc, item) => {
      if (item.product.id === product.id) {
        return acc + item.amount;
      }
      return acc;
    }, 0);
  });

  const handleAdd = () => {
    const newShoppingCartItem: ShoppingCart = {
      product: product,
      amount: amount ?? 0,
    };
    addToCart(newShoppingCartItem);
    setAmount(0);
    setOpen(true);
  };

  const availableAmount = product.stock - usedStock;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseInt(event.target.value) : 0;
    if (value > availableAmount) {
      setAmount(availableAmount);
      return;
    }
    setAmount(value);
  };
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 2, sm: 3, md: 4 }}
    >
      <ProcessSnackBar
        open={open}
        handleClose={() => setOpen(false)}
        message={"PRODUCTO AÑADIDO AL CARRITO"}
      />
      <TextField
        label="Añadir cantidad"
        variant="filled"
        fullWidth
        value={amount}
        type="number"
        required
        onChange={handleOnChange}
        style={{ marginBottom: "20px" }}
      />

      <LabelInformation title={"Precio"} value={product?.price.toString()} />
      <LabelInformation
        title={"Total"}
        value={(product?.price * amount).toString()}
      />
      <LabelInformation title={"Stock"} value={availableAmount.toString()} />
      <Button onClick={handleAdd} size="small" variant="contained">
        Añadir al carrito
      </Button>
    </Stack>
  );
};
