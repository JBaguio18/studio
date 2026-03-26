'use client';

import {
  collectionGroup,
  doc,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp,
} from 'firebase/firestore';
import { format } from 'date-fns';
import {
  useCollection,
  useFirestore,
  useMemoFirebase,
  errorEmitter, 
  FirestorePermissionError
} from '@/firebase';
import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader, TriangleAlert } from 'lucide-react';

// This type should match the `Content` entity in `docs/backend.json`
// with the addition of the document `id`.
type ContentForModeration = {
  id: string;
  title: string;
  ownerUserId: string;
  ownerDisplayName: string;
  status: 'draft' | 'pending moderation' | 'published' | 'rejected';
  createdAt: Timestamp;
};

export default function ModerationPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const contentToModerateQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collectionGroup(firestore, 'my_content'),
      where('status', '==', 'pending moderation')
    );
  }, [firestore]);

  const {
    data: content,
    isLoading,
    error,
  } = useCollection<ContentForModeration>(contentToModerateQuery);

  const handleUpdateStatus = (
    item: ContentForModeration,
    newStatus: 'published' | 'rejected'
  ) => {
    const docRef = doc(
      firestore,
      'users',
      item.ownerUserId,
      'my_content',
      item.id
    );
    const updatedData = { status: newStatus, updatedAt: serverTimestamp() };

    updateDoc(docRef, updatedData)
      .then(() => {
        toast({
          title: `Content ${newStatus}`,
          description: `"${item.title}" has been ${newStatus}.`,
        });
      })
      .catch((e) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: { status: newStatus }, // Note: serverTimestamp is not serializable for the error
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-12">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="ml-4 text-muted-foreground">Loading content...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 p-12 text-center">
            <TriangleAlert className="h-10 w-10 text-destructive" />
            <h3 className="mt-4 text-lg font-semibold text-destructive">Error Loading Content</h3>
            <p className="text-sm text-destructive/80">{error.message}</p>
        </div>
      )
    }
    if (!content || content.length === 0) {
      return (
        <div className="text-center text-muted-foreground p-12">
          <h3 className="text-lg font-semibold">Queue Clear!</h3>
          <p>There is no content awaiting moderation.</p>
        </div>
      );
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.ownerDisplayName}</TableCell>
              <TableCell>
                {format(item.createdAt.toDate(), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{item.status}</Badge>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(item, 'rejected')}
                >
                  Reject
                </Button>
                <Button size="sm" onClick={() => handleUpdateStatus(item, 'published')}>
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      <PageHeader
        title="Content Moderation"
        subtitle="Review and approve user-submitted content."
      />
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Pending Review</CardTitle>
            <CardDescription>
              The following content has been submitted by users and is awaiting
              your approval.
            </CardDescription>
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>
      </div>
    </>
  );
}
