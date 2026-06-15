import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { findProduct } from "../../services/findProducts";

export const FilterProductForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const [filterSearch, setFilterSearch] = useState(search);
  const [filterCategory, setFilterCategory] = useState(category);

  const { data } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => findProduct(pageParam),
    initialPageParam: 0,
    getNextPageParam: () => undefined,
  });

  const handleSearch = () => {
    const nuevosParams = new URLSearchParams(searchParams);

    if (filterCategory) {
      nuevosParams.set("category", filterCategory);
    } else {
      nuevosParams.delete("category");
    }

    if (filterSearch) {
      nuevosParams.set("q", filterSearch);
    } else {
      nuevosParams.delete("q");
    }

    setSearchParams(nuevosParams);
  };

  const findCategories = useMemo(() => {
    const products =
      data?.pages
        .flatMap((page) => page.data?.products ?? [])
        .filter(Boolean) ?? [];
    const categories = products.map((product) => product.category);

    return [...new Set(categories)];
  }, [data]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setFilterCategory(value === "Ninguno" ? "" : value);
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <TextField
            label="Buscar productos..."
            variant="outlined"
            fullWidth
            value={filterSearch}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFilterSearch(event.target.value)
            }
            style={{ marginBottom: "20px" }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <FormControl variant="outlined" sx={{ md: 5, minWidth: "100%" }}>
            <InputLabel id="demo-simple-select-outlined-label">
              Categoría
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={findCategories.length > 0 ? filterCategory : "Ninguno"}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value={"Ninguno"}>{"Ninguno"}</MenuItem>;
              {findCategories.map((category) => {
                return <MenuItem value={category}>{category}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          size={{ xs: 12, md: 2 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Button onClick={handleSearch} variant="contained">
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
