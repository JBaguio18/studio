import { ContentCard } from '@/components/content-card';
import { PageHeader } from '@/components/page-header';
import { getPosts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Upload } from 'lucide-react';

export default async function ClipsPage() {
  const posts = await getPosts();

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

      <div
        className="mt-8 grid grid-cols-2 gap-4"
      >
        {posts.map((post) => (
          <ContentCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
           <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center">
             <h3 className="text-lg font-semibold text-muted-foreground">No clips uploaded yet</h3>
             <p className="text-sm text-muted-foreground/80">Start by uploading your first clip!</p>
             <Button asChild className="mt-4">
                <Link href="/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                </Link>
             </Button>
           </div>
        )}
      </div>
    </>
  );
}
