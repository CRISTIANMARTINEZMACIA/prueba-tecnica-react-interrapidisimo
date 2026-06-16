import { Badge, Box, Button } from "@mui/material";
import { useShoppingCartStore } from "../../hooks/useShoppingCartStore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet } from "react-router-dom";
import { ShoppingCart } from "../shoppingCart/ShoppingCart";
import { useState } from "react";

export const Header = () => {
  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart);
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <ShoppingCart open={open} handleClose={() => setOpen(false)} />

      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backgroundColor: "background.paper",
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.1)",
        }}
      >
        <Button onClick={() => setOpen(true)} variant="outlined">
          <Badge badgeContent={shoppingCart.length} color="secondary">
            <ShoppingCartIcon color="primary" fontSize="large" />
          </Badge>
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
