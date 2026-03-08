import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Video, Eye } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welcome back, Creator!" />
      <div 
        className="mt-8 grid grid-cols-2 gap-5"
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
    </>
  );
}
