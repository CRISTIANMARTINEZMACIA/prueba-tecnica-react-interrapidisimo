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
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/getProductById";
import { ReviewCard } from "./ReviewCard";
import { LabelInformation } from "./LabelInformation";
import { SpecificationStack } from "./SpecificationStack";
import { ShoppingCartAction } from "./ShoppingCartAction";
import { useShoppingCartStore } from "../hooks/useShoppingCartStore";

export const DetailProduct = () => {
  const { id } = useParams<{ id: string }>();
  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart);
  const { data } = useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5,
  });

  const product = data.error ? null : data.data?.products;

  if (!product) {
    return (
      <Card>
        <CardHeader title="Se ha presentado un error" />
        <CardContent>
          <Typography>{data.message}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
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
