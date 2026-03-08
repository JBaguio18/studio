import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPost } from '@/lib/mock-data';
import { format } from 'date-fns';

export default async function ContentPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <p className="mb-2 font-bold uppercase text-accent">{post.creator_name}</p>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {format(new Date(post.published_at), 'MMMM d, yyyy')}
        </p>
      </header>
      
      {post.image_url && (
        <div className="relative mb-8 w-full">
          <Image
            src={post.image_url}
            alt={post.title}
            width={1200}
            height={800}
            data-ai-hint={post.image_hint}
            className="aspect-[3/2] w-full rounded-lg border object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-a:text-accent hover:prose-a:underline">
        <p>{post.content_body}</p>
      </div>
    </article>
  );
}
