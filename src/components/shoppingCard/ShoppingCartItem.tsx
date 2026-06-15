import { CardContent, Stack, Typography, Card, Button } from "@mui/material";
import type { ShoppingCart } from "../../models/shoppingCart";
import { LabelInformation } from "../common/LabelInformation";
import { useShoppingCartStore } from "../../hooks/useShoppingCartStore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

export const ShoppingCartItem = ({ item }: { item: ShoppingCart }) => {
  const remove = useShoppingCartStore((state) => state.removeFromCart);

  return (
    <Card
      sx={{ margin: "10px" }}
      variant="elevation"
      data-testid="cart-product-item"
    >
      <CardContent>
        <Stack direction={"row"} spacing={5}>
          <Typography>{item.product.title}</Typography>
          <Typography>{item.product.price}</Typography>
          <Typography>{item.amount}</Typography>
        </Stack>
        <Stack direction={"row"} spacing={5}>
          <LabelInformation
            title="Subtotal"
            value={item?.subTotal?.toString() ?? "0"}
            testId="cart-product-item-subtotal"
          />
          <LabelInformation
            title="Impuestos"
            value={item?.tax?.toString() ?? "0"}
            testId="cart-product-item-tax"
          />
          <LabelInformation
            title="Total"
            value={item?.total?.toString() ?? "0"}
            testId="cart-product-item-total"
          />
          <Button
            color="error"
            onClick={() => remove(item.product.id)}
            variant="outlined"
          >
            <DeleteOutlineIcon />
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
