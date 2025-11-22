import { Product } from '@/types/product';
import { allProduceProducts } from './products';
import tortillaProducts from './tortillaProducts';
import { addImagesToProducts } from '@/services/productImageService';
import { enhanceProducts } from '@/services/productCategorizationService';

// Combine all products, add high-quality images, and enhance with categorization
const rawProducts = [
  ...allProduceProducts,
  ...tortillaProducts,
];

// Apply image service
const productsWithImages = addImagesToProducts(rawProducts);

// Apply categorization (departments, enhanced subcategories, tags, origin, etc.)
export const allProducts: Product[] = enhanceProducts(productsWithImages);

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

// Filter by department
export const getProductsByDepartment = (department: string) => {
  return allProducts.filter(product => product.department === department);
};

// Filter by tags
export const getProductsByTag = (tag: string) => {
  return allProducts.filter(product => product.tags?.includes(tag as any));
};

// Filter by multiple tags (AND logic - product must have ALL tags)
export const getProductsByTags = (tags: string[]) => {
  return allProducts.filter(product =>
    tags.every(tag => product.tags?.includes(tag as any))
  );
};

// Get all unique departments
export const getAllDepartments = () => {
  const departments = allProducts
    .map(product => product.department)
    .filter((dept): dept is string => dept !== undefined);
  return Array.from(new Set(departments)).sort();
};

// Get all unique tags
export const getAllTags = () => {
  const tags = allProducts
    .flatMap(product => product.tags || []);
  return Array.from(new Set(tags)).sort();
};

// Get all unique origins
export const getAllOrigins = () => {
  const origins = allProducts
    .map(product => product.origin)
    .filter((origin): origin is string => origin !== undefined);
  return Array.from(new Set(origins)).sort();
};

export default allProducts;
