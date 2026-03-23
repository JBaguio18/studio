'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

const profileSchema = z.object({
  displayName: z.string().min(2, { message: 'Display name must be at least 2 characters.' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email(),
});

export default function ProfilePage() {
  const { user, userProfile, isLoading: isUserLoading } = useUserProfile();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      username: '',
      email: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        displayName: userProfile.displayName || '',
        email: userProfile.email || '',
        username: userProfile.username || userProfile.email?.split('@')[0] || '',
      });
    }
  }, [userProfile, form]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    if (!user || !firestore || !userProfile) {
      toast({ variant: 'destructive', title: 'Error', description: 'User not found.' });
      return;
    }

    const userDocRef = doc(firestore, 'users', user.uid);
    const profileDocRef = doc(firestore, `${userProfile.role}_profiles`, user.uid);
    
    const updateData = {
      displayName: values.displayName,
      username: values.username,
      updatedAt: serverTimestamp(),
    };

    try {
      await updateDoc(userDocRef, {
        displayName: values.displayName,
        updatedAt: serverTimestamp()
      });
      await updateDoc(profileDocRef, updateData);
      toast({ title: 'Profile Updated', description: 'Your changes have been saved.' });
    } catch (error) {
      console.error("Profile update error: ", error);
       const permissionError = new FirestorePermissionError({
          path: profileDocRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      toast({ variant: 'destructive', title: 'Update Failed', description: 'Could not save changes.' });
    }
  }
  
  const isLoading = form.formState.isSubmitting || isUserLoading;

  return (
    <>
      <PageHeader title="My Profile" subtitle="Manage your public profile information." />
      <div className="mt-8 flex justify-center">
        <Card className="w-full max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isLoading} className="group">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal and account details.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                <>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userProfile?.profilePhotoUrl} />
                    <AvatarFallback>{userProfile?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" type="button">Change Photo</Button>
                </div>
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="@yourusername" {...field} />
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
                        <Input disabled placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto" disabled={isLoading}>
                 {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </CardFooter>
              </fieldset>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
