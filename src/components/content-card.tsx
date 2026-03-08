import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  post: Post;
  className?: string;
}

export function ContentCard({ post, className }: ContentCardProps) {
  return (
      <Link href={`/content/${post.id}`} className="group block">
        <Card className={cn("flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/30", className)}>
          {post.image_url && (
              <div className="overflow-hidden">
                    <Image
                        src={post.image_url}
                        alt={post.title}
                        width={600}
                        height={400}
                        data-ai-hint={post.image_hint}
                        className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
              </div>
          )}
          <CardHeader>
            <p className="font-bold uppercase text-primary">{post.creator_name}</p>
            <CardTitle className="text-xl font-bold leading-snug">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.published_at), 'M/d/yyyy')}
            </p>
          </CardFooter>
        </Card>
      </Link>
  );
}
