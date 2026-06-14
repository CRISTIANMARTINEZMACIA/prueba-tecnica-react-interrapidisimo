import "./App.css";
import { ProductList } from "./components/ProductList";
import { DetailProduct } from "./components/DetailsProduct";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<DetailProduct />} />
    </Routes>
  );
}

export default App;
