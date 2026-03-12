import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, Video, Eye, Activity, Star } from 'lucide-react';
import { DashboardChart } from '@/components/dashboard-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardPage() {
  const recentActivities = [
    {
        user: 'Emily Davis',
        action: 'followed you.',
        avatar: 'https://picsum.photos/seed/emily/40/40'
    },
    {
        user: 'Kevin Lee',
        action: 'liked your clip "The Physics of a Home Run".',
        avatar: 'https://picsum.photos/seed/kevin/40/40'
    },
    {
        user: 'Sarah Johnson',
        action: 'commented: "Incredible analysis!"',
        avatar: 'https://picsum.photos/seed/sarah/40/40'
    }
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welcome back, Creator!" />
      <div 
        className="mt-8 grid grid-cols-2 gap-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">+180.1%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clips</CardTitle>
              <Video className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">152</div>
              <p className="text-xs text-muted-foreground">+19</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">1.2M</div>
              <p className="text-xs text-muted-foreground">+5%</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 animate-in fade-in-0 slide-in-from-bottom-8 duration-900">
        <DashboardChart />
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest notifications from your fans.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={activity.avatar} />
                                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                                <span className="font-semibold">{activity.user}</span>
                                {" "}
                                {activity.action}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
