'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const APP_ROUTES = ['/dashboard', '/clips', '/home', '/profile', '/settings', '/upload'];

export function SiteHeader() {
  const pathname = usePathname();

  // If the current path is an app route, don't render the site header
  if (APP_ROUTES.some(route => pathname.startsWith(route))) {
    return null;
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="w-full bg-primary py-1 text-center text-xs font-medium text-primary-foreground">
        App Preview • Editorial Content Platform
      </div>
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
