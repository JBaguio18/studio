import { Post } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const posts: Post[] = [
  {
    id: '1',
    creator_name: 'Sarah Johnson',
    title: 'The Art of the Dunk: A Deep Dive into Basketball\'s Most Exciting Play',
    published_at: '2026-02-16T10:00:00Z',
    content_body: 'From Dr. J to Michael Jordan, and from Vince Carter to Zion Williamson, the dunk has always been a spectacle. This article explores the physics, technique, and cultural impact of the slam dunk. We break down famous dunks, interview sports scientists, and look at how the art form continues to evolve in the modern game.',
    image_url: PlaceHolderImages.find(p => p.id === 'post-image-1')?.imageUrl,
    image_hint: PlaceHolderImages.find(p => p.id === 'post-image-1')?.imageHint,
  },
  {
    id: '2',
    creator_name: 'David Chen',
    title: 'Beyond the 90 Minutes: The Unseen Mental Game of Professional Soccer',
    published_at: '2026-02-15T14:30:00Z',
    content_body: 'While fans see the goals and tackles, a silent battle is waged in the minds of players. We spoke with sports psychologists and former professionals to understand the pressures, focus techniques, and mental resilience required to compete at the highest level of the world\'s most popular sport.',
    image_url: PlaceHolderImages.find(p => p.id === 'post-image-2')?.imageUrl,
    image_hint: PlaceHolderImages.find(p => p.id === 'post-image-2')?.imageHint,
  },
  {
    id: '3',
    creator_name: 'Maria Rodriguez',
    title: 'The Evolution of the Tennis Serve: From Underhand to 150 mph Aces',
    published_at: '2026-02-14T09:00:00Z',
    content_body: 'The serve is the most important shot in tennis, but it hasn\'t always been the weapon it is today. This piece traces the history of the serve, technological advancements in racquet technology, and the players who revolutionized how the point begins.',
    image_url: PlaceHolderImages.find(p => p.id === 'post-image-3')?.imageUrl,
    image_hint: PlaceHolderImages.find(p => p.id === 'post-image-3')?.imageHint,
  },
    {
    id: '4',
    creator_name: 'Alex Hamilton',
    title: 'Quarterback Confidential: How NFL Signal-Callers Read a Defense',
    published_at: '2026-02-13T18:00:00Z',
    content_body: 'It happens in seconds. A quarterback drops back, scans the field, and delivers a perfect pass. How? We break down game film and talk to quarterback coaches to reveal the secrets behind reading defensive coverages, identifying blitzes, and making game-winning decisions under pressure.',
    image_url: PlaceHolderImages.find(p => p.id === 'post-image-4')?.imageUrl,
    image_hint: PlaceHolderImages.find(p => p.id === 'post-image-4')?.imageHint,
  },
  {
    id: '5',
    creator_name: 'Emily Davis',
    title: 'The Runner\'s High: Is It a Myth or a Measurable Phenomenon?',
    published_at: '2026-02-12T11:45:00Z',
    content_body: 'Every long-distance runner talks about it: that feeling of euphoria and effortlessness that can emerge mid-run. We delve into the science behind the "runner\'s high," exploring the role of endocannabinoids and endorphins, and provide tips on how you might be able to experience it for yourself.',
    image_url: PlaceHolderImages.find(p => p.id === 'post-image-5')?.imageUrl,
    image_hint: PlaceHolderImages.find(p => p.id === 'post-image-5')?.imageHint,
  },
  {
    id: '6',
    creator_name: 'Kevin Lee',
    title: 'The Physics of a Home Run: How Data Analytics Changed Baseball',
    published_at: '2026-02-11T16:20:00Z',
    content_body: 'Launch angle, exit velocity, spin rate. The language of baseball has changed. This article explains the Statcast revolution and how teams are using advanced data to coach hitters, optimize swings, and turn routine fly balls into game-changing home runs.',
    image_url: PlaceHolderImages.find(p => p.id === 'post-image-6')?.imageUrl,
    image_hint: PlaceHolderImages.find(p => p.id === 'post-image-6')?.imageHint,
  }
];

// Simulate API latency
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getPosts(): Promise<Post[]> {
  await sleep(200);
  return posts;
}

export async function getPost(id: string): Promise<Post | undefined> {
  await sleep(200);
  return posts.find(post => post.id === id);
}
