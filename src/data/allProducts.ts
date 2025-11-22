import { Product } from '@/types/product';
import { allProduceProducts } from './products';
import tortillaProducts from './tortillaProducts';
import { addImagesToProducts } from '@/services/productImageService';

// Combine all products and add high-quality images
export const allProducts: Product[] = addImagesToProducts([
  ...allProduceProducts,
  ...tortillaProducts,
]);

// Helper functions for product filtering
export const getProductsByCategory = (category: string) => {
  return allProducts.filter(product => product.category === category);
};

export const getProductsBySubcategory = (subcategory: string) => {
  return allProducts.filter(product => product.subcategory === subcategory);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.subcategory?.toLowerCase().includes(lowerQuery) ||
    product.sku?.toLowerCase().includes(lowerQuery)
  );
};

export const getAllSubcategories = () => {
  const subcategories = allProducts
    .map(product => product.subcategory)
    .filter((subcategory): subcategory is string => subcategory !== undefined);
  return Array.from(new Set(subcategories)).sort();
};

export const getProductById = (id: string) => {
  return allProducts.find(product => product.id === id);
};

export default allProducts;
