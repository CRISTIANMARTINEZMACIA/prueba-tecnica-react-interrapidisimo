import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/getProductById";
import { ReviewCard } from "./ReviewCard";
import { useState } from "react";

export const DetailProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [amount, setAmount] = useState(0);

  const { data } = useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5,
  });

  const product = data.error ? null : data.data?.products[0];

  return (
    <Card>
      <CardHeader title={product?.title} />
      <CardMedia
        component="img"
        height="194"
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
        <Grid>
          <Typography>Descripcion</Typography>
          <Typography>{product?.description}</Typography>
        </Grid>
        <Grid>
          <Typography>Especificaciones</Typography>
          <Stack direction="row" spacing={1}>
            <Grid>
              <Typography>Precio</Typography>
              <Typography>{product?.price}</Typography>
            </Grid>
            <Grid>
              <Typography>Stock disponible</Typography>
              <Typography>{product?.stock}</Typography>
            </Grid>
            <Grid>
              <Typography>Peso</Typography>
              <Typography>{product?.weight}</Typography>
            </Grid>
            <Grid>
              <Typography>Dimensiones</Typography>
              <Typography>
                {product?.dimensions.width} x {product?.dimensions.height} x{" "}
                {product?.dimensions.depth} cm
              </Typography>
            </Grid>
          </Stack>
        </Grid>
        <Grid>
          <Typography>Garantia</Typography>
          <Typography>{product?.warrantyInformation}</Typography>
        </Grid>
        <Grid>
          <Typography>Envio</Typography>
          <Typography>{product?.shippingInformation}</Typography>
        </Grid>
        <Grid container spacing={2}>
          {product?.reviews.map((item, index) => {
            return (
              <Grid key={index} size={{ xs: 12, md: 3 }}>
                <ReviewCard review={item} />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <TextField
          label="Buscar productos..."
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(parseInt(event.target.value))
          }
          style={{ marginBottom: "20px" }}
        />
        <Button size="small">Añadir al carrito</Button>
      </CardActions>
    </Card>
  );
};
