import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SuperEmpireDB } from "./lib/database";
import allProducts from "./data/allProducts";

// Initialize database on app startup
const existingProducts = SuperEmpireDB.getAllProducts();
if (existingProducts.length === 0) {
  SuperEmpireDB.saveProducts(allProducts);
  console.log('✅ Database initialized with', allProducts.length, 'products');
}

createRoot(document.getElementById("root")!).render(<App />);
