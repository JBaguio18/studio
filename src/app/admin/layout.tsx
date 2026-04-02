'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import {
  LayoutGrid,
  LogOut,
  Loader,
  PanelLeft,
  Home,
  FileWarning,
} from 'lucide-react';

import { useAuth } from '@/firebase';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserProfile } from '@/hooks/useUserProfile';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile, isLoading } = useUserProfile();
  const auth = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace('/login');
      } else if (!userProfile || (userProfile.role !== 'admin' && userProfile.role !== 'super_admin')) {
        router.replace('/dashboard');
      }
    }
  }, [isLoading, user, userProfile, router]);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/admin/moderation', label: 'Moderation', icon: FileWarning },
    { href: '/dashboard', label: 'Back to App', icon: Home },
  ];

  if (isLoading || !user || !userProfile || (userProfile.role !== 'admin' && userProfile.role !== 'super_admin')) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
            <div className="flex h-full flex-col gap-2 bg-sidebar text-sidebar-foreground">
                <div className="flex h-14 items-center border-b border-sidebar-border px-4">
                    <Logo className="text-sidebar-primary" />
                </div>
                <nav className="grid gap-1 p-2 font-medium">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-1",
                                pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto p-2">
                     <Button variant="ghost" className="w-full justify-start gap-3 rounded-lg px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
          </SheetContent>
        </Sheet>
         <div className="flex w-full items-center justify-between">
           <h1 className="text-xl font-semibold">Admin Panel</h1>
          <Avatar>
            <AvatarImage src={userProfile?.profilePhotoUrl || `https://picsum.photos/seed/${user.uid}/40/40`} />
            <AvatarFallback>{userProfile?.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 animate-in fade-in-50 duration-700">
        {children}
      </main>
    </div>
  );
}
