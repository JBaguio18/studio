import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { User, Building } from "lucide-react";
import Link from "next/link";

export default function SignupChoicePage() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-4"/>
          <CardTitle>Join PLXYGROUND</CardTitle>
          <CardDescription>Choose your account type to get started.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <Button asChild className="h-auto w-full justify-start gap-4 py-3 text-left">
              <Link href="/signup/creator">
                <User className="h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="font-semibold">I'm a Creator / Athlete</p>
                  <p className="text-sm font-normal text-primary-foreground/80">Share your journey and connect with your audience.</p>
                </div>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-auto w-full justify-start gap-4 py-3 text-left">
              <Link href="/signup/business">
                <Building className="h-6 w-6 flex-shrink-0"/>
                <div>
                  <p className="font-semibold">I'm a Business / Admin / Coach</p>
                  <p className="text-sm font-normal text-secondary-foreground/80">Manage your brand, team, or business.</p>
                </div>
              </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
