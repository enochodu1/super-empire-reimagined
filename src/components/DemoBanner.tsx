import { useState } from 'react';
import { X, PlayCircle, User, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const DemoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  if (!isVisible) return null;

  const handleDemoLogin = async (role: 'buyer' | 'vendor' | 'admin') => {
    const credentials = {
      buyer: { email: 'demo.buyer@groceryempire.com', password: 'demo123' },
      vendor: { email: 'demo.vendor@groceryempire.com', password: 'demo123' },
      admin: { email: 'demo.admin@groceryempire.com', password: 'demo123' },
    };

    try {
      const { email, password } = credentials[role];
      await signIn(email, password);

      const dashboards = {
        buyer: '/buyer-dashboard',
        vendor: '/vendor-dashboard',
        admin: '/admin',
      };

      toast.success(`Logged in as Demo ${role.charAt(0).toUpperCase() + role.slice(1)}!`);
      navigate(dashboards[role]);
    } catch (error) {
      // If demo accounts don't exist, just navigate to login page
      toast.info(`Demo ${role} credentials: ${credentials[role].email} / ${credentials[role].password}`);
      navigate('/login');
    }
  };

  return (
    <div className="bg-gradient-to-r from-brand-green via-green-600 to-green-700 text-white py-3 px-4 relative shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <PlayCircle className="w-6 h-6 flex-shrink-0 animate-pulse" />
            <div>
              <p className="font-bold text-sm md:text-base">
                🎯 Live Demo Site - Try Everything!
              </p>
              <p className="text-xs md:text-sm text-white/90">
                Explore all features with full access • All data resets daily
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleDemoLogin('buyer')}
              className="bg-white text-green-700 hover:bg-gray-100 text-xs md:text-sm"
            >
              <User className="w-4 h-4 mr-1" />
              Buyer Demo
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleDemoLogin('vendor')}
              className="bg-white text-green-700 hover:bg-gray-100 text-xs md:text-sm"
            >
              <Building2 className="w-4 h-4 mr-1" />
              Vendor Demo
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleDemoLogin('admin')}
              className="bg-white text-green-700 hover:bg-gray-100 text-xs md:text-sm"
            >
              <ShieldCheck className="w-4 h-4 mr-1" />
              Admin Demo
            </Button>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 md:relative md:top-0 md:right-0 text-white/80 hover:text-white"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
