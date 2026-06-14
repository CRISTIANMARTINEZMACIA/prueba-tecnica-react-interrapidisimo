import { CardContent, Stack, Typography, Card } from "@mui/material";
import type { ShoppingCart } from "../models/shoppingCart";
import { LabelInformation } from "./LabelInformation";

export const ShoppingCartItem = ({ item }: { item: ShoppingCart }) => {
  return (
    <Card>
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
          />
          <LabelInformation
            title="Impuestos"
            value={item?.tax?.toString() ?? "0"}
          />
          <LabelInformation
            title="Total"
            value={item?.total?.toString() ?? "0"}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
