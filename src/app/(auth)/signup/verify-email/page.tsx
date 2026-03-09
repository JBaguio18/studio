import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-md text-center border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader>
          <Logo className="mx-auto mb-4"/>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <MailCheck className="h-16 w-16 text-primary" />
          <p className="text-muted-foreground">
            Please check your inbox (and spam folder) and click the link to complete your registration. You can close this page.
          </p>
          <Button asChild className="mt-4">
            <Link href="/login">
                Back to Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
