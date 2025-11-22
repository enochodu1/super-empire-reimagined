import { ArrowLeft, Upload, FileText, Download, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DocumentManagement = () => {
  const documents = [
    { id: '1', name: 'USDA Organic Certificate', type: 'Certification', date: '2025-01-15', status: 'verified' },
    { id: '2', name: 'Product Specification Sheet', type: 'Specs', date: '2025-03-01', status: 'verified' },
    { id: '3', name: 'Food Safety Certificate', type: 'Safety', date: '2024-12-01', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-teal-700 to-teal-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold">Document Management</h1>
          <p className="text-teal-100">Spec sheets, certifications, and safety documents</p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Upload product specifications and certifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Document Type</Label>
                <select className="w-full p-2 border rounded">
                  <option>Product Specification</option>
                  <option>Organic Certification</option>
                  <option>Safety Certificate</option>
                  <option>Insurance Document</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Select File</Label>
                <Input type="file" />
              </div>
            </div>
            <Button className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground">{doc.type} • Uploaded {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.status === 'verified' ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentManagement;
