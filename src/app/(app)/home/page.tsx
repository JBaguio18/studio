import { ContentCard } from '@/components/content-card';
import { PageHeader } from '@/components/page-header';
import { getPosts } from '@/lib/mock-data';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        title="Home Feed"
        subtitle="Latest content from creators you follow"
      />
      <div
        className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-8"
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
    </>
  );
}
