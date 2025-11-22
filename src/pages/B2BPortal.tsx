import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';

type PortalMode = 'wholesale' | 'frontSales';

// Import B2B products (we'll convert these)
const b2bProducts: Product[] = [
  // Leal Tortillas & Chips
  { id: 'LEAL-001', name: 'Chips Amarillo 4 Cut', category: 'tortilla', subcategory: 'Leal Chips', unit: 'LBS', packSize: '30 LBS', price: 24.75, priceEffectiveDate: '2025-10-10', inStock: true, sku: '6710-B' },
  { id: 'LEAL-002', name: 'Chips Blanco 4 Cut', category: 'tortilla', subcategory: 'Leal Chips', unit: 'LBS', packSize: '30 LBS', price: 24.95, priceEffectiveDate: '2025-10-10', inStock: true, sku: '6310-B' },
  { id: 'LEAL-007', name: 'Flour Tortilla 10"', category: 'tortilla', subcategory: 'Leal Flour', unit: 'CT', packSize: '10/12 CT', price: 22.50, priceEffectiveDate: '2025-10-10', inStock: true, sku: '9022' },
  { id: 'LEAL-008', name: 'Flour Tortilla 6"', category: 'tortilla', subcategory: 'Leal Flour', unit: 'CT', packSize: '18/20 CT', price: 22.95, priceEffectiveDate: '2025-10-10', inStock: true, sku: '9001' },
  // Mission/Guerrero
  { id: 'MISSION-001', name: 'Mission Mesa Yellow', category: 'tortilla', subcategory: 'Mission', unit: 'CT', packSize: '6/80 CT', price: 28.95, priceEffectiveDate: '2025-10-10', inStock: true, sku: '130919' },
  { id: 'GUERRERO-001', name: 'Guerrero Mesa White', category: 'tortilla', subcategory: 'Guerrero', unit: 'CT', packSize: '6/80 CT', price: 27.95, priceEffectiveDate: '2025-10-10', inStock: true, sku: '130951' },
];

const B2BPortal = () => {
  const [portalMode, setPortalMode] = useState<PortalMode>('wholesale');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const { addItem } = useCart();

  const filteredProducts = selectedBrand === 'all'
    ? b2bProducts
    : b2bProducts.filter(p => p.subcategory?.toLowerCase().includes(selectedBrand.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Main Site</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white text-green-700 rounded-full flex items-center justify-center font-bold text-xl">
              SE
            </div>
            <div>
              <h1 className="text-3xl font-bold">Super Empire Produce</h1>
              <p className="text-green-100">B2B Distribution Platform</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Portal Selector */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Button
            variant={portalMode === 'wholesale' ? 'default' : 'outline'}
            className="h-auto py-6 flex-col gap-2"
            onClick={() => setPortalMode('wholesale')}
          >
            <span className="text-2xl">🏢</span>
            <span className="font-bold text-lg">Wholesale Portal</span>
            <span className="text-sm opacity-80">Bulk Orders • Net 30 • Delivery</span>
          </Button>
          <Button
            variant={portalMode === 'frontSales' ? 'default' : 'outline'}
            className="h-auto py-6 flex-col gap-2"
            onClick={() => setPortalMode('frontSales')}
          >
            <span className="text-2xl">🏪</span>
            <span className="font-bold text-lg">Front Sales</span>
            <span className="text-sm opacity-80">Walk-in • Small Qty • Cash</span>
          </Button>
        </div>

        {/* Mode Banner */}
        <div className={`p-4 rounded-lg mb-6 text-center ${
          portalMode === 'wholesale'
            ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
            : 'bg-orange-100 text-orange-800 border-2 border-orange-300'
        }`}>
          <strong>{portalMode === 'wholesale' ? 'Wholesale Mode:' : 'Front Sales Mode:'}</strong>
          {' '}
          {portalMode === 'wholesale'
            ? 'Bulk pricing • Net 30 terms • Delivery scheduling available'
            : 'Small quantities • Cash/Card • Pickup available'
          }
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products ({b2bProducts.length})</SelectItem>
              <SelectItem value="leal">Leal</SelectItem>
              <SelectItem value="mission">Mission</SelectItem>
              <SelectItem value="guerrero">Guerrero</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-gray-600">
            📦 <strong>{filteredProducts.length}</strong> Products • 🏷️ Week: 10/10/25 - 10/19/25
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    {product.subcategory}
                  </span>
                  {product.sku && (
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded font-mono">
                      #{product.sku}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600">
                  📦 <strong>Pack:</strong> {product.packSize}
                </div>
                <div className="text-2xl font-bold text-green-700">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-sm">
                  {product.inStock ? (
                    <span className="text-green-600 font-semibold">✓ Available</span>
                  ) : (
                    <span className="text-gray-400">Out of Stock</span>
                  )}
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => addItem(product)}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        {/* Info Footer */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4 text-green-700">🎯 What You're Seeing</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Real Data:</strong> Extracted from actual Super Empire PDFs</li>
              <li>• <strong>Dual Portals:</strong> Switch between Wholesale & Front Sales</li>
              <li>• <strong>Brand Filtering:</strong> Leal, Mission, Guerrero brands</li>
              <li>• <strong>Stock Numbers:</strong> Matching actual inventory codes</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4 text-green-700">🚀 B2B Features</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Portal-specific pricing and availability</li>
              <li>• Real stock numbers for easy ordering</li>
              <li>• Integration with shopping cart system</li>
              <li>• Multi-brand catalog management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BPortal;
