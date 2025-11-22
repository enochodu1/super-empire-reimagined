import { useState } from 'react';
import { ArrowLeft, Send, Plus, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ProductLine {
  id: string;
  product: string;
  quantity: string;
  unit: string;
  specifications: string;
}

const RFPRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    deliveryDate: '',
    deliveryLocation: '',
    paymentTerms: '',
    budgetRange: '',
    additionalRequirements: '',
  });

  const [productLines, setProductLines] = useState<ProductLine[]>([
    { id: '1', product: '', quantity: '', unit: 'LBS', specifications: '' },
  ]);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProductLineChange = (id: string, field: string, value: string) => {
    setProductLines(productLines.map(line =>
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const addProductLine = () => {
    setProductLines([
      ...productLines,
      { id: Date.now().toString(), product: '', quantity: '', unit: 'LBS', specifications: '' },
    ]);
  };

  const removeProductLine = (id: string) => {
    if (productLines.length > 1) {
      setProductLines(productLines.filter(line => line.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.deliveryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const validProductLines = productLines.filter(line => line.product && line.quantity);
    if (validProductLines.length === 0) {
      toast.error('Please add at least one product line');
      return;
    }

    const rfpData = {
      ...formData,
      products: validProductLines,
      id: `RFP-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      status: 'open',
    };

    console.log('RFP Created:', rfpData);
    toast.success('RFP created successfully! Vendors will be notified.');
    navigate('/rfp-list');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-purple-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold">Create RFP (Request for Proposal)</h1>
          <p className="text-purple-100">Request competitive quotes from vendors</p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>RFP Details</CardTitle>
              <CardDescription>Provide basic information about your request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">RFP Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g., Weekly Fresh Produce Supply for Q1 2025"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="herbs">Herbs & Spices</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="meat">Meat & Poultry</SelectItem>
                      <SelectItem value="mixed">Mixed Products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Required Delivery Date *</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleChange('deliveryDate', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryLocation">Delivery Location</Label>
                <Input
                  id="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={(e) => handleChange('deliveryLocation', e.target.value)}
                  placeholder="123 Main St, Richmond, VA 23220"
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Lines */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Products Needed</CardTitle>
                  <CardDescription>Specify the products you're requesting quotes for</CardDescription>
                </div>
                <Button type="button" onClick={addProductLine} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {productLines.map((line, index) => (
                <Card key={line.id} className="relative">
                  <CardContent className="pt-6">
                    {productLines.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeProductLine(line.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}

                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`product-${line.id}`}>Product Name *</Label>
                          <Input
                            id={`product-${line.id}`}
                            value={line.product}
                            onChange={(e) => handleProductLineChange(line.id, 'product', e.target.value)}
                            placeholder="e.g., Roma Tomatoes"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`quantity-${line.id}`}>Quantity *</Label>
                          <Input
                            id={`quantity-${line.id}`}
                            type="number"
                            value={line.quantity}
                            onChange={(e) => handleProductLineChange(line.id, 'quantity', e.target.value)}
                            placeholder="500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`unit-${line.id}`}>Unit</Label>
                          <Select
                            value={line.unit}
                            onValueChange={(value) => handleProductLineChange(line.id, 'unit', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LBS">LBS</SelectItem>
                              <SelectItem value="CT">Count</SelectItem>
                              <SelectItem value="Cases">Cases</SelectItem>
                              <SelectItem value="Boxes">Boxes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`specifications-${line.id}`}>Specifications</Label>
                        <Textarea
                          id={`specifications-${line.id}`}
                          value={line.specifications}
                          onChange={(e) => handleProductLineChange(line.id, 'specifications', e.target.value)}
                          placeholder="Size, grade, organic certification, or other requirements..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Terms & Budget */}
          <Card>
            <CardHeader>
              <CardTitle>Terms & Budget</CardTitle>
              <CardDescription>Payment terms and budget information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select value={formData.paymentTerms} onValueChange={(value) => handleChange('paymentTerms', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net15">Net 15</SelectItem>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="prepay">Prepayment Required</SelectItem>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetRange">Budget Range (Optional)</Label>
                  <Input
                    id="budgetRange"
                    value={formData.budgetRange}
                    onChange={(e) => handleChange('budgetRange', e.target.value)}
                    placeholder="$1,000 - $2,000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                <Textarea
                  id="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={(e) => handleChange('additionalRequirements', e.target.value)}
                  placeholder="Delivery instructions, quality standards, certifications needed, or any other requirements..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <h4 className="font-semibold mb-2">What happens next?</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Your RFP will be sent to qualified vendors in our network</li>
              <li>• Vendors have 72 hours to submit competitive bids</li>
              <li>• You'll receive email notifications as bids come in</li>
              <li>• Compare all bids in your dashboard and select the best offer</li>
              <li>• Award the contract and proceed with your order</li>
            </ul>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Submit RFP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RFPRequest;
