import { Timestamp } from "firebase/firestore";

export interface Content {
  id: string;
  ownerUserId: string;
  ownerDisplayName: string;
  ownerProfilePhotoUrl: string;
  title: string;
  body: string;
  contentType: string;
  mediaUrl?: string;
  mediaThumbnailUrl?: string;
  creatorProfileId?: string;
  businessProfileId?: string;
  status: 'draft' | 'pending moderation' | 'published' | 'unpublished' | 'rejected';
  publishedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tagIds?: string[];
  orderPriority?: number;
}
