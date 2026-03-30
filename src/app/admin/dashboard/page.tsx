'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Users, FileText, ShieldAlert, Activity } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import {
  collection,
  collectionGroup,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

// Define types based on backend.json
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  displayName: string;
  profilePhotoUrl?: string;
}

interface Content {
  id: string;
}

export default function AdminDashboardPage() {
  const firestore = useFirestore();

  // Query for all users
  const usersQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'users') : null),
    [firestore]
  );
  const { data: users, isLoading: isLoadingUsers } = useCollection<User>(usersQuery);

  // Query for all published content
  const contentQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'published_content') : null),
    [firestore]
  );
  const { data: allContent, isLoading: isLoadingContent } = useCollection<Content>(contentQuery);

  // Query for content pending moderation
  const flaggedQuery = useMemoFirebase(
    () =>
      firestore
        ? query(
            collectionGroup(firestore, 'my_content'),
            where('status', '==', 'pending moderation')
          )
        : null,
    [firestore]
  );
  const { data: flaggedContent, isLoading: isLoadingFlagged } = useCollection<Content>(flaggedQuery);

  // Query for recent users
  const recentUsersQuery = useMemoFirebase(
    () =>
      firestore
        ? query(
            collection(firestore, 'users'),
            orderBy('createdAt', 'desc'),
            limit(5)
          )
        : null,
    [firestore]
  );
  const { data: recentUsers, isLoading: isLoadingRecentUsers } = useCollection<User>(recentUsersQuery);

  const renderRecentUsers = () => {
    if (isLoadingRecentUsers) {
      return [...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[60px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-[70px] rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
        </TableRow>
      ));
    }
    
    if (!recentUsers || recentUsers.length === 0) {
        return (
            <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                    No recent users.
                </TableCell>
            </TableRow>
        )
    }

    return recentUsers.map((user) => (
      <TableRow key={user.id}>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.profilePhotoUrl} />
              <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.displayName}</span>
          </div>
        </TableCell>
        <TableCell className="capitalize">{user.role}</TableCell>
        <TableCell>
          <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="capitalize">
            {user.status.replace('_', ' ')}
          </Badge>
        </TableCell>
        <TableCell>{user.email}</TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Platform overview and management."
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingUsers ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-3xl font-bold">{users?.length ?? 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Total registered users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Published Content
            </CardTitle>
            <FileText className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingContent ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-3xl font-bold">
                {allContent?.length ?? 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Live on the platform
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Moderation
            </CardTitle>
            <ShieldAlert className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingFlagged ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-3xl font-bold">
                {flaggedContent?.length ?? 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground">Items requiring review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Operational</div>
            <p className="text-xs text-muted-foreground">
              All systems running normally
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              The latest users to join the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderRecentUsers()}</TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
