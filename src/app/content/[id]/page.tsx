'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Content } from '@/lib/types';
import { Loader, TriangleAlert } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContentPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const firestore = useFirestore();

  const contentRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'published_content', id);
  }, [firestore, id]);

  const {
    data: post,
    isLoading,
    error,
  } = useDoc<Content>(contentRef);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-16 w-full mb-4" />
        <Skeleton className="h-8 w-1/2 mb-8" />
        <Skeleton className="aspect-video w-full mb-8" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-5/6 mb-4" />
      </div>
    );
  }

  if (error) {
     return (
        <div className="container mx-auto max-w-3xl px-4 py-8 flex flex-col items-center justify-center text-center">
            <TriangleAlert className="h-16 w-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Content</h2>
            <p className="text-muted-foreground">There was a problem fetching this post. It may have been removed or there was a network issue.</p>
        </div>
      )
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <p className="mb-2 font-bold uppercase text-primary">
          {post.ownerDisplayName}
        </p>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {post.publishedAt && (
            <p className="mt-4 text-lg text-muted-foreground">
                {format(post.publishedAt.toDate(), 'MMMM d, yyyy')}
            </p>
        )}
      </header>

      {post.mediaUrl && (
        <div className="relative mb-8 w-full overflow-hidden rounded-lg">
          <Image
            src={post.mediaUrl}
            alt={post.title}
            width={1200}
            height={800}
            className="w-full rounded-lg border object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-a:text-primary hover:prose-a:underline">
        <p>{post.body}</p>
      </div>
    </article>
  );
}
