import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { User, Building } from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "@/components/motion-div";

export default function SignupChoicePage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-4"/>
          <CardTitle>Join PLXYGROUND</CardTitle>
          <CardDescription>Choose your account type to get started.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <MotionDiv whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="h-auto w-full py-4">
              <Link href="/signup/creator">
                <div className="flex w-full items-center gap-4">
                  <User className="h-6 w-6"/>
                  <div className="text-left">
                    <p className="font-semibold">I'm a Creator / Athlete</p>
                    <p className="text-sm font-normal text-primary-foreground/80">Share your journey and connect with your audience.</p>
                  </div>
                </div>
              </Link>
            </Button>
          </MotionDiv>
          <MotionDiv whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" variant="secondary" className="h-auto w-full py-4">
              <Link href="/signup/business">
                <div className="flex w-full items-center gap-4">
                  <Building className="h-6 w-6"/>
                  <div className="text-left">
                    <p className="font-semibold">I'm a Business / Admin / Coach</p>
                    <p className="text-sm font-normal text-secondary-foreground/80">Manage your brand, team, or business.</p>
                  </div>
                </div>
              </Link>
            </Button>
          </MotionDiv>
        </CardContent>
      </Card>
    </div>
  );
}
