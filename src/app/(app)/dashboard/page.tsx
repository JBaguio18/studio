'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  DollarSign,
  Users,
  Video,
  Eye,
  Activity,
  Loader,
  Bell,
} from 'lucide-react';
import { DashboardChart } from '@/components/dashboard-chart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import type { Content } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

// Define a type for notifications based on backend.json
interface Notification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: any; // Using `any` for Timestamp flexibility
}

export default function DashboardPage() {
  const { user, userProfile } = useUserProfile();
  const firestore = useFirestore();

  // Query for user's content to get the count
  const userContentQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'my_content');
  }, [user, firestore]);

  const { data: userContent, isLoading: isLoadingContent } =
    useCollection<Content>(userContentQuery);

  // Query for user's recent notifications
  const notificationsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
  }, [user, firestore]);

  const { data: notifications, isLoading: isLoadingNotifications } =
    useCollection<Notification>(notificationsQuery);

  const renderRecentActivity = () => {
    if (isLoadingNotifications) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-3 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!notifications || notifications.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <Bell className="mx-auto h-8 w-8" />
          <p className="mt-2">No recent activity.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {notifications.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>
                <Bell className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold capitalize">
                {activity.type.replace(/_/g, ' ')}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.message}
              </p>
              <p className="text-xs text-muted-foreground/80">
                {format(activity.createdAt.toDate(), 'MMM d, yyyy, h:mm a')}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${userProfile?.displayName || 'Creator'}!`}
      />
      <div className="mt-8 grid grid-cols-2 gap-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
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
            {isLoadingContent ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-3xl font-bold">
                {userContent?.length || 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Your uploaded content
            </p>
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

      <div className="mt-5 grid grid-cols-1 gap-5 animate-in fade-in-0 slide-in-from-bottom-8 duration-900 lg:grid-cols-2">
        <DashboardChart />
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest notifications from your account.
            </CardDescription>
          </CardHeader>
          <CardContent>{renderRecentActivity()}</CardContent>
        </Card>
      </div>
    </>
  );
}
