import { ContentCard } from '@/components/content-card';
import { PageHeader } from '@/components/page-header';
import { getPosts } from '@/lib/mock-data';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <PageHeader
        title="PLXYGROUND"
        subtitle="Sports Creator Content"
      />
      <div
        className="mt-8 grid grid-cols-2 gap-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
      >
        {posts.map((post) => (
          <ContentCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
           <div className="col-span-full text-center text-muted-foreground">
             No content available yet. Check back soon!
           </div>
        )}
      </div>
    </div>
  );
}
