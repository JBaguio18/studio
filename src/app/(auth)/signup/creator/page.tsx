"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function CreatorSignupPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      const userDocData = {
        id: user.uid,
        email: values.email,
        role: "creator",
        status: "pending_verification",
        createdAt: new Date().toISOString(),
      };

      const userRef = doc(firestore, "users", user.uid);
      setDocumentNonBlocking(userRef, userDocData, { merge: true });

      const profileRef = doc(firestore, "creator_profiles", user.uid);
      setDocumentNonBlocking(profileRef, {
        id: user.uid,
        userId: user.uid,
        username: values.email.split('@')[0], // a default username
        displayName: values.fullName,
        profilePhotoUrl: `https://picsum.photos/seed/${user.uid}/80/80`,
        isVerified: false,
        createdAt: new Date().toISOString(),
      }, { merge: true });

      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });

      router.push('/signup/verify-email');

    } catch (error: any) {
      console.error("Signup Error:", error);
      let description = "Could not create account. Please try again.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          description = "This email address is already in use. Please use a different email.";
          break;
        case 'auth/weak-password':
          description = "The password is too weak. Please choose a stronger password.";
          break;
        case 'auth/invalid-email':
          description = "The email address is not valid. Please check and try again.";
          break;
      }
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description,
      });
    }
  }

  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-sm border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-4"/>
          <CardTitle>Creator Account</CardTitle>
          <CardDescription>Sign up to share your content</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign In
              </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
