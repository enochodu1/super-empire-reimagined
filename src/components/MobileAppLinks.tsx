import { Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const MobileAppLinks = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <Smartphone className="w-16 h-16" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Order on the Go</h3>
            <p className="text-blue-100 mb-4">
              Download our mobile app for easy ordering, real-time updates, and exclusive mobile-only deals
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href="#" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
