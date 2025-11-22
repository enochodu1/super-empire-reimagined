import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Package, Users, Star } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

const StatItem = ({ icon: Icon, value, suffix = '', prefix = '', label, duration = 2000 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-brand-green" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground text-center">{label}</div>
    </div>
  );
};

export const StatsCounter = () => {
  const stats = [
    {
      icon: Package,
      value: 500,
      suffix: '+',
      label: 'Products Available',
    },
    {
      icon: Users,
      value: 1250,
      suffix: '+',
      label: 'Active Customers',
    },
    {
      icon: TrendingUp,
      value: 15847,
      label: 'Orders This Month',
    },
    {
      icon: Star,
      value: 4.9,
      suffix: '/5',
      label: 'Customer Rating',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Businesses Across Dallas-Fort Worth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of restaurants, grocery stores, and institutions that rely on our platform daily
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
