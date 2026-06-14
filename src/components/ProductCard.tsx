import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import type { ProductResponse } from "../models/product";

export interface ProductCardProps {
  product: ProductResponse;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card>
      <CardHeader title={product.title} />
      <CardMedia
        component="img"
        height="194"
        image={product.images[0]}
        alt={product.title}
      />
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Rating name="read-only" value={product.rating} readOnly />
          <Typography>({product.rating})</Typography>
        </Stack>

        <Typography>{product.description}</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={product.category} color="secondary" variant="outlined" />
          <Chip
            label={product.stock > 0 ? product.stock + " En stock" : "Agotado"}
            color={product.stock > 0 ? "success" : "error"}
            variant="outlined"
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" color="primary">
          {product.price}
        </Typography>
        <Button size="small">Ver detalles</Button>
      </CardActions>
    </Card>
  );
};
