import { Badge, Button, Grid } from "@mui/material";
import { useShoppingCartStore } from "../hooks/useShoppingCartStore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet } from "react-router-dom";
import { ShoppingCart } from "./ShoppingCart";
import { useState } from "react";

export const Header = () => {
  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart);
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={2}>
      <ShoppingCart open={open} handleClose={() => setOpen(false)} />
      <Grid sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button
          sx={{ alignItems: "end" }}
          onClick={() => setOpen(true)}
          variant="outlined"
        >
          <Badge badgeContent={shoppingCart.length} color="secondary">
            <ShoppingCartIcon color="primary" fontSize="large" />
          </Badge>
        </Button>
      </Grid>
      <Outlet></Outlet>
    </Grid>
  );
};
