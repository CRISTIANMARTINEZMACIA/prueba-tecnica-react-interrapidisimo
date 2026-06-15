import "./App.css";
import { DetailProduct } from "./components/detailsProduct/DetailsProduct";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Header } from "./components/common/Header";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import { NotFoundView } from "./components/errors/NotFoundView";
import { Error500View } from "./components/errors/Error500View";
import { Suspense } from "react";
import { DetailErrorBoundary } from "./components/errors/DetailErrorBoundary";
import { Grid } from "@mui/material";
import { SkeletonGrid } from "./components/common/SkeletonGrid";
import { ProductPage } from "./components/products/ProductPage";

function App() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleReset = () => {
    queryClient.clear();
    navigate("/panel/products");
  };

  return (
    <ErrorBoundary FallbackComponent={Error500View} onReset={handleReset}>
      <Routes>
        <Route path="/" element={<Navigate to="/panel/products" replace />} />

        <Route path="/panel" element={<Header />}>
          <Route path="products" element={<ProductPage />} />
          <Route
            path="products/:id"
            element={
              <ErrorBoundary FallbackComponent={DetailErrorBoundary}>
                <Suspense
                  fallback={
                    <Grid sx={{ width: "100%", height: "100%" }}>
                      <SkeletonGrid amount={1} />
                    </Grid>
                  }
                >
                  <DetailProduct />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
