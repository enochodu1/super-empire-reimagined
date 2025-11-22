import { useState } from 'react';
import { ArrowLeft, Building, Store, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

type AccountTier = 'wholesale' | 'restaurant' | 'retail';

interface TierOption {
  id: AccountTier;
  title: string;
  icon: any;
  description: string;
  benefits: string[];
  requirements: string;
}

const tierOptions: TierOption[] = [
  {
    id: 'wholesale',
    title: 'Wholesale Distributor',
    icon: Building,
    description: 'For distributors, food service companies, and large-scale buyers',
    benefits: [
      'Volume discounts (15-30%)',
      'Net 30 payment terms',
      'Dedicated account manager',
      'Priority delivery scheduling',
      'Custom pricing agreements',
    ],
    requirements: 'Minimum order: $2,500/month',
  },
  {
    id: 'restaurant',
    title: 'Restaurant / Food Service',
    icon: UtensilsCrossed,
    description: 'For restaurants, cafes, caterers, and food service operations',
    benefits: [
      'Restaurant pricing (10-20% off retail)',
      'Flexible order sizes',
      'Weekly delivery options',
      'Seasonal menu planning support',
      'Quality guarantee',
    ],
    requirements: 'Minimum order: $500/week',
  },
  {
    id: 'retail',
    title: 'Retail / Small Business',
    icon: Store,
    description: 'For grocery stores, markets, and small retail operations',
    benefits: [
      'Competitive retail pricing',
      'Small quantity orders available',
      'Flexible payment options',
      'Product variety',
      'Regular stock updates',
    ],
    requirements: 'Minimum order: $200',
  },
];

const BuyerRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<AccountTier>('restaurant');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    dbaName: '',
    businessType: '',
    taxId: '',
    businessLicense: '',

    // Contact Information
    ownerName: '',
    primaryContactName: '',
    email: '',
    phone: '',
    businessAddress: '',
    city: '',
    state: '',
    zipCode: '',

    // Credit Application
    requestCredit: false,
    creditAmount: '',
    bankName: '',
    bankAccountNumber: '',
    bankRoutingNumber: '',

    // Trade References
    trade1Company: '',
    trade1Contact: '',
    trade1Phone: '',
    trade2Company: '',
    trade2Contact: '',
    trade2Phone: '',

    // Additional
    estimatedMonthlyOrders: '',
    productInterests: [] as string[],
    deliveryPreference: '',
    additionalNotes: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProductInterestToggle = (product: string) => {
    const interests = formData.productInterests.includes(product)
      ? formData.productInterests.filter(p => p !== product)
      : [...formData.productInterests, product];
    setFormData({ ...formData, productInterests: interests });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.businessName || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    console.log('Buyer Registration Submitted:', {
      tier: selectedTier,
      ...formData,
    });

    setSubmitted(true);
    toast.success('Registration submitted successfully!');
  };

  if (submitted) {
    const tier = tierOptions.find(t => t.id === selectedTier);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl">Registration Received!</CardTitle>
            <CardDescription>
              Your {tier?.title} application has been submitted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Verification Process</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Application received and under review</li>
                <li>• Business verification in progress (1-2 business days)</li>
                <li>• {formData.requestCredit ? 'Credit check and approval (2-3 business days)' : 'Account setup'}</li>
                <li>• Welcome email with login credentials</li>
                <li>• Account manager assignment</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Account Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Account Type</p>
                  <p className="font-semibold">{tier?.title}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Application ID</p>
                  <p className="font-mono">#BA-{Date.now().toString().slice(-8)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Business Name</p>
                  <p className="font-semibold">{formData.businessName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact Email</p>
                  <p className="font-semibold">{formData.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Next Steps</h3>
              <p className="text-sm text-muted-foreground">
                Check your email ({formData.email}) for a verification link. Our team may reach out
                for additional documentation if needed. Once approved, you'll receive login credentials
                and can start placing orders immediately!
              </p>
            </div>

            <Button onClick={() => navigate('/')} className="w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Main Site</span>
          </Link>
          <h1 className="text-3xl font-bold">Buyer Registration</h1>
          <p className="text-blue-100">Create your business account with Super Empire Produce</p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-20 mt-2">
            <span className="text-sm font-medium">Account Type</span>
            <span className="text-sm font-medium">Business Info</span>
            <span className="text-sm font-medium">Credit & Terms</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Account Type Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Account Type</CardTitle>
                  <CardDescription>
                    Choose the tier that best matches your business needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {tierOptions.map((tier) => {
                      const Icon = tier.icon;
                      return (
                        <Card
                          key={tier.id}
                          className={`cursor-pointer transition-all ${
                            selectedTier === tier.id
                              ? 'border-blue-600 shadow-lg ring-2 ring-blue-600'
                              : 'hover:border-blue-300'
                          }`}
                          onClick={() => setSelectedTier(tier.id)}
                        >
                          <CardHeader>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3">
                              <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <CardTitle className="text-lg">{tier.title}</CardTitle>
                            <CardDescription>{tier.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-2">BENEFITS:</p>
                              <ul className="space-y-1">
                                {tier.benefits.map((benefit, i) => (
                                  <li key={i} className="text-xs flex items-start">
                                    <CheckCircle2 className="w-3 h-3 mr-1 mt-0.5 text-green-600 flex-shrink-0" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-3 border-t">
                              <p className="text-xs font-semibold text-blue-600">{tier.requirements}</p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setStep(2)}>
                  Continue to Business Information
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Business Information */}
          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Tell us about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Legal Business Name *</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => handleChange('businessName', e.target.value)}
                        placeholder="ABC Restaurant LLC"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dbaName">DBA Name (if different)</Label>
                      <Input
                        id="dbaName"
                        value={formData.dbaName}
                        onChange={(e) => handleChange('dbaName', e.target.value)}
                        placeholder="Joe's Diner"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID / EIN *</Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => handleChange('taxId', e.target.value)}
                        placeholder="XX-XXXXXXX"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessLicense">Business License #</Label>
                      <Input
                        id="businessLicense"
                        value={formData.businessLicense}
                        onChange={(e) => handleChange('businessLicense', e.target.value)}
                        placeholder="BL-123456"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner/Manager Name *</Label>
                      <Input
                        id="ownerName"
                        value={formData.ownerName}
                        onChange={(e) => handleChange('ownerName', e.target.value)}
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactName">Primary Contact (if different)</Label>
                      <Input
                        id="primaryContactName"
                        value={formData.primaryContactName}
                        onChange={(e) => handleChange('primaryContactName', e.target.value)}
                        placeholder="Jane Doe"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="contact@business.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessAddress">Business Address *</Label>
                    <Input
                      id="businessAddress"
                      value={formData.businessAddress}
                      onChange={(e) => handleChange('businessAddress', e.target.value)}
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        placeholder="Richmond"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        placeholder="VA"
                        maxLength={2}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        placeholder="23220"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Interests</Label>
                    <div className="grid md:grid-cols-4 gap-3">
                      {['Vegetables', 'Fruits', 'Herbs', 'Dairy', 'Meat', 'Prepared Foods'].map((product) => (
                        <div key={product} className="flex items-center space-x-2">
                          <Checkbox
                            id={product}
                            checked={formData.productInterests.includes(product)}
                            onCheckedChange={() => handleProductInterestToggle(product)}
                          />
                          <label htmlFor={product} className="text-sm cursor-pointer">
                            {product}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedMonthlyOrders">Estimated Monthly Orders</Label>
                      <Input
                        id="estimatedMonthlyOrders"
                        value={formData.estimatedMonthlyOrders}
                        onChange={(e) => handleChange('estimatedMonthlyOrders', e.target.value)}
                        placeholder="$5,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryPreference">Delivery Preference</Label>
                      <Input
                        id="deliveryPreference"
                        value={formData.deliveryPreference}
                        onChange={(e) => handleChange('deliveryPreference', e.target.value)}
                        placeholder="Weekly on Tuesdays"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Continue to Credit Application
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Credit & Terms */}
          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Application (Optional)</CardTitle>
                  <CardDescription>
                    Apply for credit terms to take advantage of Net 30 payment options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="requestCredit"
                      checked={formData.requestCredit}
                      onCheckedChange={(checked) => handleChange('requestCredit', checked)}
                    />
                    <label htmlFor="requestCredit" className="text-sm font-medium cursor-pointer">
                      I would like to apply for credit terms (Net 30)
                    </label>
                  </div>

                  {formData.requestCredit && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="creditAmount">Requested Credit Limit</Label>
                        <Input
                          id="creditAmount"
                          value={formData.creditAmount}
                          onChange={(e) => handleChange('creditAmount', e.target.value)}
                          placeholder="$10,000"
                        />
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Banking Information</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bankName">Bank Name</Label>
                            <Input
                              id="bankName"
                              value={formData.bankName}
                              onChange={(e) => handleChange('bankName', e.target.value)}
                              placeholder="First National Bank"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bankAccountNumber">Account Number</Label>
                            <Input
                              id="bankAccountNumber"
                              value={formData.bankAccountNumber}
                              onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
                              placeholder="****1234"
                              type="password"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bankRoutingNumber">Routing Number</Label>
                            <Input
                              id="bankRoutingNumber"
                              value={formData.bankRoutingNumber}
                              onChange={(e) => handleChange('bankRoutingNumber', e.target.value)}
                              placeholder="123456789"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Trade References</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Provide at least 2 trade references from current suppliers
                        </p>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-3 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="trade1Company">Company 1</Label>
                              <Input
                                id="trade1Company"
                                value={formData.trade1Company}
                                onChange={(e) => handleChange('trade1Company', e.target.value)}
                                placeholder="Supplier Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="trade1Contact">Contact</Label>
                              <Input
                                id="trade1Contact"
                                value={formData.trade1Contact}
                                onChange={(e) => handleChange('trade1Contact', e.target.value)}
                                placeholder="Contact Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="trade1Phone">Phone</Label>
                              <Input
                                id="trade1Phone"
                                value={formData.trade1Phone}
                                onChange={(e) => handleChange('trade1Phone', e.target.value)}
                                placeholder="(555) 123-4567"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="trade2Company">Company 2</Label>
                              <Input
                                id="trade2Company"
                                value={formData.trade2Company}
                                onChange={(e) => handleChange('trade2Company', e.target.value)}
                                placeholder="Supplier Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="trade2Contact">Contact</Label>
                              <Input
                                id="trade2Contact"
                                value={formData.trade2Contact}
                                onChange={(e) => handleChange('trade2Contact', e.target.value)}
                                placeholder="Contact Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="trade2Phone">Phone</Label>
                              <Input
                                id="trade2Phone"
                                value={formData.trade2Phone}
                                onChange={(e) => handleChange('trade2Phone', e.target.value)}
                                placeholder="(555) 987-6543"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => handleChange('additionalNotes', e.target.value)}
                    placeholder="Any special requirements, delivery instructions, or additional information..."
                    rows={4}
                  />
                </CardContent>
              </Card>

              <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-4">
                <h4 className="font-semibold mb-2">Terms & Conditions</h4>
                <p className="text-sm text-muted-foreground">
                  By submitting this application, you agree to our terms of service and authorize
                  Super Empire Produce to verify the information provided and perform credit checks
                  if applicable. All applications are subject to approval.
                </p>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit">
                  Submit Registration
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BuyerRegistration;
