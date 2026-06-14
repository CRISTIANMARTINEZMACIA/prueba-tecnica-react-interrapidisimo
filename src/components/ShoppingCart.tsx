import { Drawer, Stack } from "@mui/material";
import React from "react";
import { useShoppingCartStore } from "../hooks/useShoppingCartStore";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { LabelInformation } from "./LabelInformation";

export interface ShoppingCart {
  open: boolean;
  handleClose: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
}

export const ShoppingCart = ({
  open,
  handleClose,
  anchor = "right",
}: ShoppingCart) => {
  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart);

  return (
    <React.Fragment>
      <Drawer anchor={anchor} open={open} onClose={handleClose}>
        {shoppingCart.length > 0 &&
          shoppingCart.map((item) => {
            return <ShoppingCartItem key={item.product.id} item={item} />;
          })}

        <Stack direction={"row"} spacing={5}>
          <LabelInformation
            title="Subtotal"
            value={
              shoppingCart
                .reduce((acc, item) => acc + (item.subTotal ?? 0), 0)
                .toString() ?? "0"
            }
          />
          <LabelInformation
            title="Impuestos"
            value={
              shoppingCart
                .reduce((acc, item) => acc + (item.tax ?? 0), 0)
                .toString() ?? "0"
            }
          />
          <LabelInformation
            title="Total"
            value={
              shoppingCart
                .reduce((acc, item) => acc + (item.total ?? 0), 0)
                .toString() ?? "0"
            }
          />
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};
