import { Grid, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useState, type FocusEvent } from "react";

export const FilterProductForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const [filterSearch, setFilterSearch] = useState(search);
  const [filterCategory, setFilterCategory] = useState(category);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const handleFocusCategory = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Buscar productos..."
          variant="outlined"
          fullWidth
          value={filterSearch}
          onBlur={handleFocus}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilterSearch(event.target.value)
          }
          style={{ marginBottom: "20px" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Buscar categoría..."
          variant="outlined"
          fullWidth
          value={filterCategory}
          onBlur={handleFocusCategory}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilterCategory(event.target.value)
          }
          style={{ marginBottom: "20px" }}
        />
      </Grid>
    </Grid>
  );
};
