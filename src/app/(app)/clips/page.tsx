'use client';

import { ContentCard } from '@/components/content-card';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Upload, Loader, Video } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Content } from '@/lib/types';

export default function ClipsPage() {
  const { user } = useUserProfile();
  const firestore = useFirestore();

  const userContentQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'my_content'),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const { data: posts, isLoading } = useCollection<Content>(userContentQuery);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="col-span-full flex items-center justify-center p-12">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="ml-4 text-muted-foreground">Loading your clips...</p>
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
          <Video className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-muted-foreground">
            No clips uploaded yet
          </h3>
          <p className="text-sm text-muted-foreground/80">
            Start by uploading your first clip!
          </p>
          <Button asChild className="mt-4">
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Link>
          </Button>
        </div>
      );
    }
    return posts.map((post) => <ContentCard key={post.id} content={post} />);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader title="My Clips" subtitle="Manage your uploaded content." />
        <Button asChild>
          <Link href="/upload">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Clip
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        {renderContent()}
      </div>
    </>
  );
}
