import { useState } from 'react';
import { ArrowLeft, Award, Gift, TrendingUp, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Tier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  icon: string;
  available: boolean;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'redeemed';
}

const RewardsProgram = () => {
  const [currentTier, setCurrentTier] = useState<Tier>('silver');
  const [totalPoints, setTotalPoints] = useState(2750);
  const [lifetimeSpent, setLifetimeSpent] = useState(12350);

  const tierBenefits = {
    bronze: {
      name: 'Bronze',
      color: 'bg-amber-700',
      pointsRate: 1,
      minSpend: 0,
      benefits: ['1 point per $1 spent', 'Birthday reward', 'Early sale access'],
    },
    silver: {
      name: 'Silver',
      color: 'bg-gray-400',
      pointsRate: 1.25,
      minSpend: 5000,
      benefits: ['1.25 points per $1', 'Birthday reward', 'Priority support', '5% off seasonal items'],
    },
    gold: {
      name: 'Gold',
      color: 'bg-yellow-500',
      pointsRate: 1.5,
      minSpend: 15000,
      benefits: ['1.5 points per $1', 'Birthday reward', 'Dedicated rep', '10% off seasonal items', 'Free delivery'],
    },
    platinum: {
      name: 'Platinum',
      color: 'bg-purple-600',
      pointsRate: 2,
      minSpend: 30000,
      benefits: ['2 points per $1', 'Birthday reward', 'Dedicated rep', '15% off seasonal items', 'Free delivery', 'Exclusive products'],
    },
  };

  const rewards: Reward[] = [
    { id: '1', title: '$10 Off Next Order', description: 'Get $10 off your next purchase', pointsCost: 500, icon: '💵', available: true },
    { id: '2', title: '$25 Off Next Order', description: 'Get $25 off your next purchase', pointsCost: 1200, icon: '💰', available: true },
    { id: '3', title: 'Free Delivery', description: 'Free delivery on your next order', pointsCost: 300, icon: '🚚', available: true },
    { id: '4', title: '$50 Off Next Order', description: 'Get $50 off your next purchase', pointsCost: 2500, icon: '🎁', available: true },
    { id: '5', title: 'Free Premium Box', description: 'Get a free premium produce box', pointsCost: 3000, icon: '📦', available: false },
    { id: '6', title: '$100 Off Next Order', description: 'Get $100 off your next purchase', pointsCost: 5000, icon: '💎', available: false },
  ];

  const transactions: Transaction[] = [
    { id: '1', date: '2025-11-20', description: 'Purchase #12345', points: 150, type: 'earned' },
    { id: '2', date: '2025-11-18', description: 'Redeemed: $10 Off', points: -500, type: 'redeemed' },
    { id: '3', date: '2025-11-15', description: 'Purchase #12344', points: 220, type: 'earned' },
    { id: '4', date: '2025-11-10', description: 'Birthday Bonus', points: 200, type: 'earned' },
    { id: '5', date: '2025-11-05', description: 'Purchase #12343', points: 180, type: 'earned' },
  ];

  const nextTier = currentTier === 'bronze' ? 'silver' : currentTier === 'silver' ? 'gold' : currentTier === 'gold' ? 'platinum' : null;
  const nextTierSpend = nextTier ? tierBenefits[nextTier].minSpend : 0;
  const progressToNextTier = nextTier ? ((lifetimeSpent / nextTierSpend) * 100) : 100;

  const handleRedeemReward = (reward: Reward) => {
    if (totalPoints >= reward.pointsCost && reward.available) {
      setTotalPoints(totalPoints - reward.pointsCost);
      alert(`Redeemed: ${reward.title}! Code will be sent to your email.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <Award className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Rewards Program</h1>
              <p className="text-yellow-100">Earn points with every purchase and unlock exclusive benefits</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Points Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Points</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                = ${(totalPoints / 100).toFixed(2)} in rewards
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Tier</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${tierBenefits[currentTier].color}`} />
                <div className="text-3xl font-bold">{tierBenefits[currentTier].name}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {tierBenefits[currentTier].pointsRate}x points per $1
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lifetime Spending</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${lifetimeSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Since joining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tier Progress */}
        {nextTier && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Progress to {tierBenefits[nextTier].name}</CardTitle>
              <CardDescription>
                Spend ${nextTierSpend - lifetimeSpent} more to unlock {tierBenefits[nextTier].name} benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={progressToNextTier} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${lifetimeSpent.toLocaleString()}</span>
                  <span>${nextTierSpend.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="rewards" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="tiers">Tiers</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle>Redeem Your Points</CardTitle>
                <CardDescription>Choose from our selection of rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className={!reward.available ? 'opacity-50' : ''}>
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <div className="text-5xl mb-2">{reward.icon}</div>
                          <h3 className="font-semibold text-lg">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <Star className="w-5 h-5 text-yellow-600" />
                            <span className="text-2xl font-bold">{reward.pointsCost}</span>
                            <span className="text-sm text-muted-foreground">points</span>
                          </div>

                          <Button
                            className="w-full"
                            disabled={!reward.available || totalPoints < reward.pointsCost}
                            onClick={() => handleRedeemReward(reward)}
                          >
                            {!reward.available
                              ? 'Coming Soon'
                              : totalPoints < reward.pointsCost
                              ? `Need ${reward.pointsCost - totalPoints} more points`
                              : 'Redeem'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tiers Tab */}
          <TabsContent value="tiers">
            <div className="grid md:grid-cols-2 gap-6">
              {(Object.keys(tierBenefits) as Tier[]).map((tier) => {
                const tierInfo = tierBenefits[tier];
                const isCurrentTier = tier === currentTier;

                return (
                  <Card key={tier} className={isCurrentTier ? 'border-2 border-yellow-500' : ''}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${tierInfo.color}`} />
                          <CardTitle>{tierInfo.name}</CardTitle>
                        </div>
                        {isCurrentTier && <Badge>Current Tier</Badge>}
                      </div>
                      <CardDescription>
                        Spend ${tierInfo.minSpend.toLocaleString()}+ per year
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <p className="text-sm font-semibold text-center">
                            Earn {tierInfo.pointsRate}x points on every purchase
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-semibold mb-2">Benefits:</p>
                          <ul className="space-y-1">
                            {tierInfo.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Points History</CardTitle>
                <CardDescription>View your recent points activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        {transaction.type === 'earned' ? (
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                            <Gift className="w-5 h-5 text-orange-600" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>

                      <div className={`font-semibold ${transaction.type === 'earned' ? 'text-green-600' : 'text-orange-600'}`}>
                        {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* How It Works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Shop</h3>
                <p className="text-sm text-muted-foreground">Make purchases at Super Empire Produce</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Earn</h3>
                <p className="text-sm text-muted-foreground">Collect points on every dollar spent</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Level Up</h3>
                <p className="text-sm text-muted-foreground">Unlock higher tiers for better rewards</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">4. Redeem</h3>
                <p className="text-sm text-muted-foreground">Use points for discounts and rewards</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RewardsProgram;
