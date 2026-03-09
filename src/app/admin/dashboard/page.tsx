import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, FileText, ShieldAlert, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const recentUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'creator', status: 'active', avatar: 'https://picsum.photos/seed/user1/40/40' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'business', status: 'active', avatar: 'https://picsum.photos/seed/user2/40/40' },
    { id: '3', name: 'Sam Wilson', email: 'sam@example.com', role: 'fan', status: 'pending', avatar: 'https://picsum.photos/seed/user3/40/40' },
]

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Platform overview and management." />
      <div 
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">+120 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <FileText className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">5,210</div>
              <p className="text-xs text-muted-foreground">+500 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
              <ShieldAlert className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">3 requires review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-3xl font-bold">Operational</div>
              <p className="text-xs text-muted-foreground">All systems running normally</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Card>
            <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>The latest users to join the platform.</CardDescription>
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
                    <TableBody>
                        {recentUsers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
