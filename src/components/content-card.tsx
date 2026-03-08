import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MotionDiv } from './motion-div';

interface ContentCardProps {
  post: Post;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContentCard({ post, className }: ContentCardProps) {
  return (
    <MotionDiv variants={cardVariants} >
      <Link href={`/content/${post.id}`} className="group block">
        <Card className={cn("flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:border-primary/30", className)}>
          {post.image_url && (
              <div className="overflow-hidden">
                  <MotionDiv whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image
                        src={post.image_url}
                        alt={post.title}
                        width={600}
                        height={400}
                        data-ai-hint={post.image_hint}
                        className="aspect-[3/2] w-full object-cover"
                    />
                  </MotionDiv>
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
    </MotionDiv>
  );
}
