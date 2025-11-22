import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeProducts } from "./lib/database";
import allProducts from "./data/allProducts";

// Initialize database with products and images on app startup
initializeProducts(allProducts);
console.log('✅ Database initialized with', allProducts.length, 'products');

createRoot(document.getElementById("root")!).render(<App />);
