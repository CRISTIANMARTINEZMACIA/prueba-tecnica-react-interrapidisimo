import "./App.css";
import { ProductList } from "./components/ProductList";
import { DetailProduct } from "./components/DetailsProduct";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/panel/products"/>}
      />
      <Route
        path="/panel"
        element={<Header />}
        children={[
          <Route path="products" element={<ProductList />} />,
          <Route path="products/:id" element={<DetailProduct />} />,
        ]}
      />
    </Routes>
  );
}

export default App;
