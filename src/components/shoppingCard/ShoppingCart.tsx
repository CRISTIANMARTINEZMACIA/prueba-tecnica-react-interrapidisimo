import { Button, Drawer, Stack } from "@mui/material";
import React from "react";
import { useShoppingCartStore } from "../../hooks/useShoppingCartStore";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { LabelInformation } from "../common/LabelInformation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

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
  const clear = useShoppingCartStore((state) => state.clearCart);

  return (
    <React.Fragment>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={handleClose}
        sx={{ margin: "10px" }}
      >
        {shoppingCart.length > 0 &&
          shoppingCart.map((item) => {
            return <ShoppingCartItem key={item.product.id} item={item} />;
          })}

        <hr />
        <Stack direction={"row"} spacing={5} sx={{ paddingLeft: "10px" }} data-testid="cart-summary">
          <LabelInformation
            title="Subtotal"
            value={
              shoppingCart
                .reduce((acc, item) => acc + (item.subTotal ?? 0), 0)
                .toFixed(2)
                .toString() ?? "0"
            }
            testId="cart-summary-subtotal"
          />
          <LabelInformation
            title="Impuestos"
            value={
              shoppingCart
                .reduce((acc, item) => acc + (item.tax ?? 0), 0)
                .toString() ?? "0"
            }
           testId="cart-summary-tax"
          />
          <LabelInformation
            title="Total"
            value={
              shoppingCart
                .reduce((acc, item) => acc + (item.total ?? 0), 0)
                .toString() ?? "0"
            }
            testId="cart-summary-total"
          />
          <Button color="error" onClick={() => clear()} variant="outlined">
            <DeleteOutlineIcon />
          </Button>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};
