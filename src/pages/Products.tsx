import { useState, useMemo, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getAllSubcategories } from '@/data/allProducts';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { SuperEmpireDB } from '@/lib/database';
import { COMPANY_INFO } from '@/lib/companyInfo';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Fuse from 'fuse.js';

// Import all view components
import { ViewSwitcher, ViewMode } from '@/components/products/ViewSwitcher';
import { GridView } from '@/components/products/GridView';
import { ListView } from '@/components/products/ListView';
import { TableView } from '@/components/products/TableView';
import { CompactView } from '@/components/products/CompactView';
import { QuickActions } from '@/components/products/QuickActions';
import { EnhancedFilters, FilterState } from '@/components/products/EnhancedFilters';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantityInputs, setQuantityInputs] = useState<Record<string, number>>({});

  // View mode with localStorage persistence
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('superempire_view_mode');
    return (saved as ViewMode) || 'grid';
  });

  // Calculate price range from products
  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 100 };
    const prices = products.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  // Enhanced filters state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: [],
    subcategories: [],
    priceRange: [priceRange.min, priceRange.max],
    stockStatus: [],
    sortBy: 'name-asc',
  });

  const { addToCart } = useCart();

  // Load products from database on mount
  useEffect(() => {
    const loadedProducts = SuperEmpireDB.getAllProducts();
    setProducts(loadedProducts);
  }, []);

  // Update price range when products load
  useEffect(() => {
    if (products.length > 0 && filters.priceRange[0] === 0 && filters.priceRange[1] === 100) {
      setFilters(prev => ({
        ...prev,
        priceRange: [priceRange.min, priceRange.max]
      }));
    }
  }, [products, priceRange]);

  // Persist view mode to localStorage
  useEffect(() => {
    localStorage.setItem('superempire_view_mode', viewMode);
  }, [viewMode]);

  // Fuzzy search with Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ['name', 'subcategory', 'id', 'category'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply fuzzy search if query exists
    if (filters.searchQuery && filters.searchQuery.length >= 2) {
      const fuseResults = fuse.search(filters.searchQuery);
      const searchedIds = new Set(fuseResults.map(r => r.item.id));
      filtered = filtered.filter(p => searchedIds.has(p.id));
    }

    // Filter by categories (multi-select)
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }

    // Filter by subcategories (multi-select)
    if (filters.subcategories.length > 0) {
      filtered = filtered.filter(p =>
        p.subcategory && filters.subcategories.includes(p.subcategory)
      );
    }

    // Filter by price range
    filtered = filtered.filter(p =>
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by stock status
    if (filters.stockStatus.length > 0) {
      filtered = filtered.filter(p => filters.stockStatus.includes(p.stockStatus));
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'category':
          return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, fuse, filters]);

  // Get available categories with counts
  const availableCategories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    products.forEach(p => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });

    const categoryLabels: Record<string, string> = {
      produce: 'Fresh Produce',
      tortilla: 'Tortillas & Chips',
      dairy: 'Dairy Products',
    };

    return Array.from(categoryMap.entries()).map(([value, count]) => ({
      value,
      label: categoryLabels[value] || value,
      count,
    }));
  }, [products]);

  // Get all subcategories
  const subcategories = getAllSubcategories();

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseInt(value) || 0;
    setQuantityInputs(prev => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantityInputs[product.id] || 1;
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantityInputs(prev => ({ ...prev, [product.id]: 0 }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Load shopping list or order into cart
  const handleLoadList = (items: { productId: string; quantity: number }[]) => {
    const newQuantities = { ...quantityInputs };
    items.forEach(item => {
      newQuantities[item.productId] = item.quantity;
    });
    setQuantityInputs(newQuantities);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Our Product Catalog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {COMPANY_INFO.serviceArea.description}
          </p>
          <Badge className="mt-4 bg-green-500 text-white">
            Weekly Prices Updated: {COMPANY_INFO.pricing.effectiveDate}
          </Badge>
        </div>

        {/* Quick Actions: Reorder & Shopping Lists */}
        <div className="mb-8">
          <QuickActions
            onLoadList={handleLoadList}
            currentCart={quantityInputs}
            products={products}
          />
        </div>

        {/* Layout: Filters Sidebar + Products Grid */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Enhanced Filters Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <EnhancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={availableCategories}
              availableSubcategories={subcategories}
              priceMin={priceRange.min}
              priceMax={priceRange.max}
              productCount={filteredProducts.length}
            />
          </aside>

          {/* Products Display */}
          <div>
            {/* View Mode Switcher */}
            <div className="mb-6 flex items-center justify-end">
              <ViewSwitcher view={viewMode} onViewChange={setViewMode} />
            </div>

            {/* Dynamic View Rendering */}
            {viewMode === 'grid' && (
              <GridView
                products={filteredProducts}
                quantityInputs={quantityInputs}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                formatPrice={formatPrice}
              />
            )}

            {viewMode === 'list' && (
              <ListView
                products={filteredProducts}
                quantityInputs={quantityInputs}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                formatPrice={formatPrice}
              />
            )}

            {viewMode === 'table' && (
              <TableView
                products={filteredProducts}
                quantityInputs={quantityInputs}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                formatPrice={formatPrice}
              />
            )}

            {viewMode === 'compact' && (
              <CompactView
                products={filteredProducts}
                quantityInputs={quantityInputs}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                formatPrice={formatPrice}
              />
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No products found</p>
                <p className="text-gray-400 dark:text-gray-500 mb-6">
                  Try adjusting your filters or search query
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
