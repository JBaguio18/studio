'use client';

import { ContentCard } from '@/components/content-card';
import { PageHeader } from '@/components/page-header';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Content } from '@/lib/types';
import { Loader } from 'lucide-react';

export default function HomePage() {
  const firestore = useFirestore();

  const publishedContentQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'published_content'),
      orderBy('publishedAt', 'desc')
    );
  }, [firestore]);

  const { data: posts, isLoading } =
    useCollection<Content>(publishedContentQuery);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="col-span-full flex items-center justify-center p-12">
          <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="ml-4 text-muted-foreground">Loading feed...</p>
        </div>
      );
    }
    if (!posts || posts.length === 0) {
      return (
        <div className="col-span-full text-center text-muted-foreground">
          No content has been published yet.
        </div>
      );
    }
    return posts.map((post) => <ContentCard key={post.id} content={post} />);
  };

  return (
    <>
      <PageHeader
        title="Home Feed"
        subtitle="Latest content from the PLXYGROUND community"
      />
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        {renderContent()}
      </div>
    </>
  );
}
