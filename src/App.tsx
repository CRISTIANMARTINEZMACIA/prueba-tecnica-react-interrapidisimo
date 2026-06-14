import { Suspense } from "react";
import "./App.css";
import { Product } from "./components/Product";

import { SkeletonGrid } from "./components/SkeletonGrid";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <Grid container spacing={2}>
            <SkeletonGrid amount={10} />
          </Grid>
        }
      >
        <Product />
      </Suspense>
    </>
  );
}

export default App;
