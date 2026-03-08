import { ContentCard } from '@/components/content-card';
import { PageHeader } from '@/components/page-header';
import { getPosts } from '@/lib/mock-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        title="Home Feed"
        subtitle="Latest content from creators you follow"
      />
      <div
        className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
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
