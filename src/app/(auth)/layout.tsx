'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || user) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
      )
  }

  return <>{children}</>;
}
