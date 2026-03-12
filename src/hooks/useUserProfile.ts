'use client';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, DocumentData } from 'firebase/firestore';

// Define a type for the user profile for better type safety
interface UserProfile extends DocumentData {
  id: string;
  email: string;
  displayName: string;
  profilePhotoUrl?: string;
  role: 'creator' | 'business' | 'fan' | 'admin' | 'super_admin';
  status: string;
  createdAt: string;
}


export function useUserProfile() {
  const { user, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading, error } = useDoc<UserProfile>(userDocRef);

  return {
    user,
    userProfile,
    isLoading: isAuthLoading || isProfileLoading,
    error,
  };
}
