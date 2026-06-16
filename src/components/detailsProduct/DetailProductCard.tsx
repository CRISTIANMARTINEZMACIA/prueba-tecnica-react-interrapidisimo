import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import type { ProductResponse } from "../../models/product";
import { LabelInformation } from "../common/LabelInformation";
import { ReviewCard } from "./ReviewCard";
import { ShoppingCartAction } from "../shoppingCart/ShoppingCartAction";
import { SpecificationStack } from "./SpecificationStack";
import { useShoppingCartStore } from "../../hooks/useShoppingCartStore";

export const DetailProductCard = ({
  product,
}: {
  product: ProductResponse;
}) => {
  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart);

  return (
    <Card sx={{ maxWidth: "100%", border: "2px solid #ccc" }}>
      <CardHeader
        title={product?.title}
        subheader={
          shoppingCart.some((cart) => cart.product.id === product.id) ? (
            <Chip label="En carrito" color="secondary" />
          ) : (
            ""
          )
        }
      />
      <CardMedia
        component="img"
        height="300"
        image={product?.images[0]}
        alt={product?.title}
      />
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Chip
            label={product?.category}
            color="secondary"
            variant="outlined"
          />
          <Chip label={product?.brand} color="default" variant="outlined" />
          <Chip
            label={product?.stock ?? 0 > 0 ? "En stock" : "Agotado"}
            color={product?.stock ?? 0 > 0 ? "success" : "error"}
            variant="outlined"
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Rating name="read-only" value={product?.rating} readOnly />
          <Typography>
            ({product?.rating}/5) - ({product?.reviews.length} reseñas)
          </Typography>
        </Stack>
        <LabelInformation title={"Descripción"} value={product?.description} />

        <SpecificationStack product={product} />

        <LabelInformation
          title={"Garantía"}
          value={product?.warrantyInformation}
        />
        <LabelInformation
          title={"Envió"}
          value={product?.shippingInformation}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <ShoppingCartAction product={product} />
      </CardActions>

      <Grid container spacing={2}>
        {product?.reviews.map((item, index) => {
          return (
            <Grid key={index} size={{ xs: 12, md: 3 }}>
              <ReviewCard review={item} />
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};
