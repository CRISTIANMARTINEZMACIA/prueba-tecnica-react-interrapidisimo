import { Grid, Stack, Typography } from "@mui/material";
import { LabelInformation } from "../common/LabelInformation";
import type { ProductResponse } from "../../models/product";

export const SpecificationStack = ({
  product,
}: {
  product: ProductResponse;
}) => {
  return (
    <Grid>
      <Typography>Especificaciones</Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, sm: 3, md: 4 }}
      >
        <LabelInformation title={"Precio"} value={product?.price.toString()} />
        <LabelInformation title={"Stock"} value={product?.stock.toString()} />
        <LabelInformation title={"Peso"} value={product?.weight.toString()} />
        <LabelInformation
          title={"Dimensiones"}
          value={`${product?.dimensions.width} x ${product?.dimensions.height} x ${product?.dimensions.depth} cm`}
        />
      </Stack>
    </Grid>
  );
};
