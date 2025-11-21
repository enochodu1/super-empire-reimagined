import { useState, useMemo, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getAllSubcategories } from '@/data/allProducts';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { SuperEmpireDB } from '@/lib/database';
import { COMPANY_INFO } from '@/lib/companyInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Clock, BookMarked } from 'lucide-react';
import Fuse from 'fuse.js';

// Import all view components
import { ViewSwitcher, ViewMode } from '@/components/products/ViewSwitcher';
import { GridView } from '@/components/products/GridView';
import { ListView } from '@/components/products/ListView';
import { TableView } from '@/components/products/TableView';
import { CompactView } from '@/components/products/CompactView';
import { QuickActions } from '@/components/products/QuickActions';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [quantityInputs, setQuantityInputs] = useState<Record<string, number>>({});

  // View mode with localStorage persistence
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('superempire_view_mode');
    return (saved as ViewMode) || 'grid';
  });

  const { addToCart } = useCart();

  // Load products from database on mount
  useEffect(() => {
    const loadedProducts = SuperEmpireDB.getAllProducts();
    setProducts(loadedProducts);
  }, []);

  // Persist view mode to localStorage
  useEffect(() => {
    localStorage.setItem('superempire_view_mode', viewMode);
  }, [viewMode]);

  // Fuzzy search with Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ['name', 'subcategory', 'id', 'category'],
      threshold: 0.3, // 0 = perfect match, 1 = match anything
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [products]);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category first
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    }

    // Apply fuzzy search if query exists
    if (searchQuery && searchQuery.length >= 2) {
      const fuseResults = fuse.search(searchQuery);
      const searchedIds = new Set(fuseResults.map(r => r.item.id));
      filtered = filtered.filter(p => searchedIds.has(p.id));
    }

    return filtered;
  }, [products, fuse, searchQuery, selectedCategory, selectedSubcategory]);

  const subcategories = getAllSubcategories();

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseInt(value) || 0;
    setQuantityInputs(prev => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantityInputs[product.id] || 1;
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantityInputs(prev => ({ ...prev, [product.id]: 0 })); // Reset quantity
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Our Product Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="produce">Fresh Produce</SelectItem>
                  <SelectItem value="tortilla">Tortillas & Chips</SelectItem>
                  <SelectItem value="dairy">Dairy Products</SelectItem>
                </SelectContent>
              </Select>

              {/* Subcategory Filter */}
              <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subcategories" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {subcategories.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count & View Switcher */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> products
            </p>
            {(searchQuery || selectedCategory !== 'all' || selectedSubcategory !== 'all') && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>

          {/* View Mode Switcher */}
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
            <p className="text-xl text-gray-500 mb-4">No products found</p>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
