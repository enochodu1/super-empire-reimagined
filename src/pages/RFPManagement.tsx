import { useState } from 'react';
import { ArrowLeft, FileText, DollarSign, TrendingDown, Award, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface RFP {
  id: string;
  title: string;
  category: string;
  deliveryDate: string;
  status: 'open' | 'closed' | 'awarded';
  createdAt: string;
  bidCount: number;
}

interface Bid {
  id: string;
  vendorName: string;
  totalPrice: number;
  deliveryDate: string;
  paymentTerms: string;
  notes: string;
  submittedAt: string;
  rating: number;
}

const RFPManagement = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'buyer' | 'vendor'>('buyer');

  // Sample data for buyer view
  const myRFPs: RFP[] = [
    { id: 'RFP-20251', title: 'Weekly Fresh Produce Supply - Q1 2025', category: 'Mixed', deliveryDate: '2025-01-15', status: 'open', createdAt: '2025-11-15', bidCount: 5 },
    { id: 'RFP-20252', title: 'Organic Vegetables - Monthly Contract', category: 'Vegetables', deliveryDate: '2025-12-01', status: 'awarded', createdAt: '2025-11-10', bidCount: 8 },
    { id: 'RFP-20253', title: 'Premium Fruits for Restaurant', category: 'Fruits', deliveryDate: '2025-11-30', status: 'closed', createdAt: '2025-11-18', bidCount: 3 },
  ];

  const [selectedRFP, setSelectedRFP] = useState<RFP>(myRFPs[0]);

  const bidsForRFP: Bid[] = [
    { id: 'BID-001', vendorName: 'Green Valley Farms', totalPrice: 2450, deliveryDate: '2025-01-15', paymentTerms: 'Net 30', notes: 'Certified organic, GAP certified', submittedAt: '2025-11-16', rating: 4.8 },
    { id: 'BID-002', vendorName: 'Fresh Harvest Co', totalPrice: 2280, deliveryDate: '2025-01-14', paymentTerms: 'Net 15', notes: '10% discount for 6-month contract', submittedAt: '2025-11-17', rating: 4.5 },
    { id: 'BID-003', vendorName: 'Sunrise Produce', totalPrice: 2650, deliveryDate: '2025-01-15', paymentTerms: 'Net 30', notes: 'Premium quality, same-day delivery', submittedAt: '2025-11-18', rating: 4.9 },
    { id: 'BID-004', vendorName: 'Valley Fresh Distributors', totalPrice: 2195, deliveryDate: '2025-01-16', paymentTerms: 'Prepay 2%', notes: '2% prepay discount', submittedAt: '2025-11-19', rating: 4.3 },
    { id: 'BID-005', vendorName: 'Farm Direct Supply', totalPrice: 2420, deliveryDate: '2025-01-15', paymentTerms: 'Net 30', notes: 'Free delivery over $2000', submittedAt: '2025-11-20', rating: 4.7 },
  ];

  // Sample data for vendor view
  const availableRFPs: RFP[] = [
    { id: 'RFP-20254', title: 'Restaurant Supply - Weekly Vegetables', category: 'Vegetables', deliveryDate: '2025-12-10', status: 'open', createdAt: '2025-11-20', bidCount: 2 },
    { id: 'RFP-20255', title: 'Organic Fruits - Bulk Order', category: 'Fruits', deliveryDate: '2025-12-15', status: 'open', createdAt: '2025-11-21', bidCount: 4 },
    { id: 'RFP-20256', title: 'Herbs & Spices - Monthly Supply', category: 'Herbs', deliveryDate: '2025-12-05', status: 'open', createdAt: '2025-11-19', bidCount: 1 },
  ];

  const [bidForm, setBidForm] = useState({
    totalPrice: '',
    deliveryDate: '',
    paymentTerms: 'net30',
    notes: '',
  });

  const handleBidSubmit = (rfpId: string) => {
    if (!bidForm.totalPrice || !bidForm.deliveryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    console.log('Bid submitted for RFP:', rfpId, bidForm);
    toast.success('Your bid has been submitted successfully!');
    setBidForm({ totalPrice: '', deliveryDate: '', paymentTerms: 'net30', notes: '' });
  };

  const handleAwardBid = (bidId: string, vendorName: string) => {
    console.log('Awarding bid:', bidId);
    toast.success(`Contract awarded to ${vendorName}!`);
  };

  const lowestBid = Math.min(...bidsForRFP.map(b => b.totalPrice));
  const avgBid = bidsForRFP.reduce((sum, b) => sum + b.totalPrice, 0) / bidsForRFP.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-500">Open</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Closed</Badge>;
      case 'awarded':
        return <Badge className="bg-blue-500">Awarded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">RFP Management</h1>
              <p className="text-purple-100">Manage requests for proposals and bids</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={view === 'buyer' ? 'secondary' : 'outline'}
                onClick={() => setView('buyer')}
              >
                Buyer View
              </Button>
              <Button
                variant={view === 'vendor' ? 'secondary' : 'outline'}
                onClick={() => setView('vendor')}
              >
                Vendor View
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {view === 'buyer' ? (
          // BUYER VIEW
          <Tabs defaultValue="active" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="active">Active RFPs</TabsTrigger>
                <TabsTrigger value="compare">Compare Bids</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <Button onClick={() => navigate('/rfp-request')}>
                <FileText className="w-4 h-4 mr-2" />
                Create New RFP
              </Button>
            </div>

            {/* Active RFPs Tab */}
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>My RFPs</CardTitle>
                  <CardDescription>View and manage your requests for proposals</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>RFP ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead>Bids</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myRFPs.map((rfp) => (
                        <TableRow key={rfp.id}>
                          <TableCell className="font-mono">{rfp.id}</TableCell>
                          <TableCell className="font-medium">{rfp.title}</TableCell>
                          <TableCell>{rfp.category}</TableCell>
                          <TableCell>{rfp.deliveryDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{rfp.bidCount} bids</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(rfp.status)}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedRFP(rfp);
                                document.querySelector('[value="compare"]')?.dispatchEvent(new Event('click', { bubbles: true }));
                              }}
                            >
                              View Bids
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compare Bids Tab */}
            <TabsContent value="compare">
              <div className="space-y-6">
                {/* RFP Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedRFP.title}</CardTitle>
                    <CardDescription>RFP ID: {selectedRFP.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Bids</p>
                        <p className="text-2xl font-bold">{bidsForRFP.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Lowest Bid</p>
                        <p className="text-2xl font-bold text-green-600">${lowestBid.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average Bid</p>
                        <p className="text-2xl font-bold">${avgBid.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Savings</p>
                        <p className="text-2xl font-bold text-green-600">
                          {(((avgBid - lowestBid) / avgBid) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bid Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Bid Comparison</CardTitle>
                    <CardDescription>Compare all submitted bids</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bidsForRFP.sort((a, b) => a.totalPrice - b.totalPrice).map((bid, index) => (
                        <Card key={bid.id} className={index === 0 ? 'border-green-500 border-2' : ''}>
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-lg font-semibold">{bid.vendorName}</h3>
                                  <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-sm font-medium">{bid.rating}</span>
                                  </div>
                                  {index === 0 && (
                                    <Badge className="bg-green-500">
                                      <TrendingDown className="w-3 h-3 mr-1" />
                                      Lowest Bid
                                    </Badge>
                                  )}
                                </div>

                                <div className="grid md:grid-cols-4 gap-4 mb-3">
                                  <div>
                                    <p className="text-xs text-muted-foreground">Total Price</p>
                                    <p className="text-xl font-bold">${bid.totalPrice.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Delivery Date</p>
                                    <p className="font-medium">{bid.deliveryDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Payment Terms</p>
                                    <p className="font-medium">{bid.paymentTerms}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">Submitted</p>
                                    <p className="font-medium">{bid.submittedAt}</p>
                                  </div>
                                </div>

                                {bid.notes && (
                                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                    <p className="text-sm">{bid.notes}</p>
                                  </div>
                                )}
                              </div>

                              <div className="ml-4 flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  className="whitespace-nowrap"
                                  onClick={() => handleAwardBid(bid.id, bid.vendorName)}
                                >
                                  <Award className="w-4 h-4 mr-2" />
                                  Award Contract
                                </Button>
                                <Button size="sm" variant="outline">
                                  Contact Vendor
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>RFP History</CardTitle>
                  <CardDescription>View past RFPs and awarded contracts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>RFP ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Awarded To</TableHead>
                        <TableHead>Final Price</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono">RFP-20252</TableCell>
                        <TableCell>Organic Vegetables - Monthly Contract</TableCell>
                        <TableCell>Green Valley Farms</TableCell>
                        <TableCell className="font-semibold">$3,250.00</TableCell>
                        <TableCell>2025-11-10</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // VENDOR VIEW
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available RFPs</CardTitle>
                <CardDescription>View open requests and submit your bids</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableRFPs.map((rfp) => (
                    <Card key={rfp.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{rfp.title}</h3>
                              {getStatusBadge(rfp.status)}
                              <Badge variant="outline">{rfp.bidCount} bids submitted</Badge>
                            </div>

                            <div className="grid md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-muted-foreground">RFP ID</p>
                                <p className="font-mono">{rfp.id}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Category</p>
                                <p className="font-medium">{rfp.category}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Delivery Date</p>
                                <p className="font-medium">{rfp.deliveryDate}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Posted</p>
                                <p className="font-medium">{rfp.createdAt}</p>
                              </div>
                            </div>
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>
                                <Send className="w-4 h-4 mr-2" />
                                Submit Bid
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Submit Bid for {rfp.id}</DialogTitle>
                                <DialogDescription>{rfp.title}</DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="totalPrice">Total Bid Amount *</Label>
                                    <Input
                                      id="totalPrice"
                                      type="number"
                                      value={bidForm.totalPrice}
                                      onChange={(e) => setBidForm({ ...bidForm, totalPrice: e.target.value })}
                                      placeholder="2500.00"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="deliveryDate">Proposed Delivery Date *</Label>
                                    <Input
                                      id="deliveryDate"
                                      type="date"
                                      value={bidForm.deliveryDate}
                                      onChange={(e) => setBidForm({ ...bidForm, deliveryDate: e.target.value })}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                                  <Input
                                    id="paymentTerms"
                                    value={bidForm.paymentTerms}
                                    onChange={(e) => setBidForm({ ...bidForm, paymentTerms: e.target.value })}
                                    placeholder="Net 30"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="notes">Additional Notes</Label>
                                  <Textarea
                                    id="notes"
                                    value={bidForm.notes}
                                    onChange={(e) => setBidForm({ ...bidForm, notes: e.target.value })}
                                    placeholder="Certifications, special offers, or other relevant information..."
                                    rows={4}
                                  />
                                </div>

                                <Button
                                  className="w-full"
                                  onClick={() => handleBidSubmit(rfp.id)}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Submit Bid
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RFPManagement;
