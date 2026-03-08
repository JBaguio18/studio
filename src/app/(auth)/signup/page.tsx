import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { User, Building, Heart } from "lucide-react";
import Link from "next/link";

export default function SignupChoicePage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Logo className="mx-auto mb-4"/>
        <CardTitle>Join PLXYGROUND</CardTitle>
        <CardDescription>Choose your account type to get started.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button asChild size="lg" className="h-auto py-4">
          <Link href="/signup/creator">
            <div className="flex items-center gap-4">
              <User className="h-6 w-6"/>
              <div className="text-left">
                <p className="font-semibold">I'm a Creator</p>
                <p className="text-sm font-normal text-primary-foreground/80">Share content and build your community.</p>
              </div>
            </div>
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="h-auto py-4">
           <Link href="/signup/business">
            <div className="flex items-center gap-4">
              <Building className="h-6 w-6"/>
              <div className="text-left">
                <p className="font-semibold">I'm a Business</p>
                <p className="text-sm font-normal text-secondary-foreground/80">Promote your brand and partner with creators.</p>
              </div>
            </div>
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="h-auto py-4">
           <Link href="/signup/fan">
            <div className="flex items-center gap-4">
              <Heart className="h-6 w-6"/>
              <div className="text-left">
                <p className="font-semibold">I'm a Fan</p>
                <p className="text-sm font-normal text-secondary-foreground/80">Follow creators and discover content.</p>
              </div>
            </div>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
