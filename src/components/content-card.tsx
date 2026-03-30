import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Content } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { ImageIcon } from 'lucide-react';

interface ContentCardProps {
  content: Content;
  className?: string;
}

function getDisplayDate(content: Content) {
  if (content.status === 'published' && content.publishedAt) {
    return content.publishedAt.toDate();
  }
  return content.createdAt.toDate();
}

export function ContentCard({ content, className }: ContentCardProps) {
  return (
      <Link href={`/content/${content.id}`} className="group block w-full">
        <Card className={cn("flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2", className)}>
          <div className="overflow-hidden relative">
            {content.mediaUrl ? (
                <Image
                    src={content.mediaUrl}
                    alt={content.title}
                    width={600}
                    height={750}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            ) : (
              <div className="aspect-[4/5] w-full bg-muted flex flex-col items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground mt-2">No Image</p>
              </div>
            )}
            {content.status !== 'published' && (
                <Badge variant="secondary" className="absolute top-2 right-2">{content.status}</Badge>
            )}
          </div>
          <CardHeader>
            <p className="font-bold uppercase text-primary">{content.ownerDisplayName}</p>
            <CardTitle className="font-headline text-2xl font-bold leading-snug transition-colors group-hover:text-primary">
              {content.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
             <p className="text-sm text-muted-foreground line-clamp-3">{content.body}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {format(getDisplayDate(content), 'M/d/yyyy')}
            </p>
          </CardFooter>
        </Card>
      </Link>
  );
}
