import { Instagram, Facebook } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const SocialMediaFeed = () => {
  const instagramPosts = [
    { id: 1, image: '🍅', caption: 'Fresh heirloom tomatoes just arrived!', likes: 245 },
    { id: 2, image: '🥬', caption: 'Organic kale, perfect for your smoothies', likes: 189 },
    { id: 3, image: '🍓', caption: 'Sweet strawberries - limited supply!', likes: 312 },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-600" />
            <CardTitle>Instagram Feed</CardTitle>
          </div>
          <CardDescription>@superempireproduce</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {instagramPosts.map(post => (
              <div key={post.id} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-5xl cursor-pointer hover:opacity-80 transition">
                {post.image}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Facebook className="w-5 h-5 text-blue-600" />
            <CardTitle>Facebook Updates</CardTitle>
          </div>
          <CardDescription>Super Empire Produce</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm">🎉 Weekend Special: 20% off all organic vegetables!</p>
              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm">🚚 New delivery schedule starting next week. Check our website for details!</p>
              <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
