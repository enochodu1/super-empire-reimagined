import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const recipes = [
  { id: 1, title: 'Roasted Tomato Basil Soup', image: '🍅', time: '45 min', serves: 4, difficulty: 'Easy', category: 'Soup', featured: ['Tomatoes', 'Basil'] },
  { id: 2, title: 'Summer Veggie Stir-Fry', image: '🥘', time: '30 min', serves: 4, difficulty: 'Easy', category: 'Main', featured: ['Bell Peppers', 'Broccoli'] },
  { id: 3, title: 'Farm Fresh Salad Bowl', image: '🥗', time: '15 min', serves: 2, difficulty: 'Easy', category: 'Salad', featured: ['Lettuce', 'Tomatoes'] },
  { id: 4, title: 'Butternut Squash Risotto', image: '🍲', time: '60 min', serves: 6, difficulty: 'Medium', category: 'Main', featured: ['Butternut Squash'] },
];

const RecipeBlog = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <ChefHat className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Recipe Blog</h1>
              <p className="text-orange-100">Fresh ideas for your seasonal produce</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="text-6xl text-center mb-4">{recipe.image}</div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.featured.map(item => (
                      <Badge key={item} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Serves {recipe.serves}
                  </div>
                  <Badge>{recipe.difficulty}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeBlog;
