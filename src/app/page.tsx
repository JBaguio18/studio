'use client';
import { ContentCard } from '@/components/content-card';
import { PageHeader } from '@/components/page-header';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Content } from '@/lib/types';
import { Loader } from 'lucide-react';

export default function Home() {
  const firestore = useFirestore();

  const publishedContentQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // This assumes you have a top-level collection named 'published_content'
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
          <p className="ml-4 text-muted-foreground">Loading content...</p>
        </div>
      );
    }
    if (!posts || posts.length === 0) {
      return (
        <div className="col-span-full text-center text-muted-foreground">
          No content available yet. Check back soon!
        </div>
      );
    }
    return posts.map((post) => <ContentCard key={post.id} content={post} />);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <PageHeader title="PLXYGROUND" subtitle="Sports Creator Content" />
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        {renderContent()}
      </div>
    </div>
  );
}
