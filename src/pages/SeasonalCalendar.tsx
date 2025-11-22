import { ArrowLeft, Calendar as CalendarIcon, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const seasonalProduce = {
  spring: [
    { name: 'Asparagus', peak: 'Mar-May', description: 'Fresh, tender spears perfect for grilling', image: '🌱' },
    { name: 'Strawberries', peak: 'Apr-Jun', description: 'Sweet, juicy berries at peak ripeness', image: '🍓' },
    { name: 'Peas', peak: 'Apr-Jun', description: 'Crisp sugar snap and English peas', image: '🫛' },
    { name: 'Lettuce', peak: 'Mar-May', description: 'Crisp varieties of all types', image: '🥬' },
  ],
  summer: [
    { name: 'Tomatoes', peak: 'Jun-Sep', description: 'Peak flavor heirloom and beefsteak', image: '🍅' },
    { name: 'Corn', peak: 'Jul-Sep', description: 'Sweet, fresh-picked corn on the cob', image: '🌽' },
    { name: 'Peppers', peak: 'Jul-Sep', description: 'Bell peppers and hot varieties', image: '🫑' },
    { name: 'Watermelon', peak: 'Jun-Aug', description: 'Refreshing, sweet summer melon', image: '🍉' },
  ],
  fall: [
    { name: 'Pumpkins', peak: 'Sep-Nov', description: 'Perfect for pies and decoration', image: '🎃' },
    { name: 'Apples', peak: 'Sep-Nov', description: 'Crisp eating and baking apples', image: '🍎' },
    { name: 'Brussels Sprouts', peak: 'Sep-Feb', description: 'Nutty, sweet when roasted', image: '🥬' },
    { name: 'Sweet Potatoes', peak: 'Sep-Dec', description: 'Rich, sweet root vegetables', image: '🍠' },
  ],
  winter: [
    { name: 'Kale', peak: 'Nov-Mar', description: 'Hardy greens, sweeter after frost', image: '🥬' },
    { name: 'Citrus', peak: 'Dec-Apr', description: 'Oranges, grapefruits, lemons', image: '🍊' },
    { name: 'Root Vegetables', peak: 'Nov-Mar', description: 'Carrots, parsnips, turnips', image: '🥕' },
    { name: 'Winter Squash', peak: 'Oct-Feb', description: 'Butternut, acorn, and more', image: '🎃' },
  ],
};

const SeasonalCalendar = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <CalendarIcon className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Seasonal Product Calendar</h1>
              <p className="text-green-100">Discover what's fresh and in season</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Leaf className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Why Buy Seasonal?</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ <strong>Better Flavor:</strong> Produce at peak ripeness tastes better</li>
                  <li>✓ <strong>Lower Prices:</strong> Abundant supply means better deals</li>
                  <li>✓ <strong>Fresher Product:</strong> Less time in transit, more nutrients</li>
                  <li>✓ <strong>Support Local:</strong> Seasonal eating supports regional farmers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="spring" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="spring">🌸 Spring</TabsTrigger>
            <TabsTrigger value="summer">☀️ Summer</TabsTrigger>
            <TabsTrigger value="fall">🍂 Fall</TabsTrigger>
            <TabsTrigger value="winter">❄️ Winter</TabsTrigger>
          </TabsList>

          {Object.entries(seasonalProduce).map(([season, products]) => (
            <TabsContent key={season} value={season}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.name}>
                    <CardHeader>
                      <div className="text-5xl text-center mb-3">{product.image}</div>
                      <CardTitle className="text-center">{product.name}</CardTitle>
                      <CardDescription className="text-center">
                        <Badge variant="outline" className="mt-2">{product.peak}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-center text-muted-foreground">{product.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SeasonalCalendar;
