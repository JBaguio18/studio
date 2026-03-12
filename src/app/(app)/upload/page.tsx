'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, CheckCircle, Sparkles, Loader } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import {
  useFirestore,
  errorEmitter,
  FirestorePermissionError,
} from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import {
  aiContentOptimizer,
  type AiContentOptimizerOutput,
} from '@/ai/flows/ai-content-optimizer-flow';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  contentType: z.enum(['video', 'image'], {
    required_error: 'You need to select a content type.',
  }),
});

export default function UploadPage() {
  const { user, userProfile, isLoading: isUserLoading } = useUserProfile();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiSuggestions, setAiSuggestions] =
    useState<AiContentOptimizerOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      contentType: 'video',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 500 * 1024 * 1024) {
        // 500MB
        setFileError('File size cannot exceed 500MB.');
        setFile(null);
      } else {
        setFile(selectedFile);
        setFileError(null);
      }
    }
  };

  async function handleOptimizeContent() {
    const { title, description } = form.getValues();
    if (!title && !description) {
      toast({
        variant: 'destructive',
        title: 'Nothing to optimize!',
        description: 'Please enter a title and/or description first.',
      });
      return;
    }

    setIsOptimizing(true);
    setAiSuggestions(null);
    try {
      const result = await aiContentOptimizer({
        originalTitle: title,
        originalDescription: description,
      });
      setAiSuggestions(result);
    } catch (error) {
      console.error('AI Optimization Error:', error);
      toast({
        variant: 'destructive',
        title: 'AI Optimization Failed',
        description: 'Could not generate suggestions. Please try again.',
      });
    } finally {
      setIsOptimizing(false);
    }
  }

  function applyAiSuggestions() {
    if (aiSuggestions) {
      form.setValue('title', aiSuggestions.optimizedTitle, {
        shouldValidate: true,
      });
      form.setValue('description', aiSuggestions.optimizedDescription, {
        shouldValidate: true,
      });
      setAiSuggestions(null); // Clear suggestions after applying
      toast({
        title: 'Suggestions Applied!',
        description: 'The title and description have been updated.',
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) {
      setFileError('A media file is required.');
      return;
    }
    if (!user || !userProfile || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to upload content.',
      });
      return;
    }

    const contentCollection = collection(
      firestore,
      'users',
      user.uid,
      'my_content'
    );

    // In a real app, you would upload the file to Firebase Storage first
    // and get the URL. For now, we'll use a placeholder.
    // const fileUrl = await uploadFile(file);

    const newContentData = {
      ownerUserId: user.uid,
      ownerDisplayName: userProfile.displayName,
      ownerProfilePhotoUrl:
        userProfile.profilePhotoUrl || `https://picsum.photos/seed/${user.uid}/40/40`,
      title: values.title,
      body: values.description,
      contentType: values.contentType,
      status: 'pending moderation' as const,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // mediaUrl: fileUrl,
    };

    addDoc(contentCollection, newContentData)
      .then(() => {
        toast({
          title: 'Upload Successful!',
          description: 'Your content has been submitted for review.',
        });
        router.push('/clips');
      })
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
          path: `users/${user.uid}/my_content`,
          operation: 'create',
          requestResourceData: newContentData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }

  const isLoading = form.formState.isSubmitting || isUserLoading;

  return (
    <>
      <PageHeader
        title="Upload New Content"
        subtitle="Share your latest clip or image with the world."
      />
      <div className="mt-8 flex justify-center">
        <Card className="w-full max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Content Details</CardTitle>
                <CardDescription>
                  Fill out the information below to upload your new content. It
                  will be reviewed by an admin before publishing.
                </CardDescription>
              </CardHeader>
              <fieldset disabled={isLoading} className="group">
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Play" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A short description of your content..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleOptimizeContent}
                      disabled={isOptimizing}
                      className="group-disabled:pointer-events-none"
                    >
                      {isOptimizing ? (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      {isOptimizing ? 'Optimizing...' : 'Optimize with AI'}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Use AI to improve your title and description for better
                      engagement.
                    </p>
                  </div>

                  {aiSuggestions && (
                    <Card className="bg-accent/50 border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Sparkles className="h-5 w-5 text-primary" />
                          AI Suggestions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-sm font-semibold">
                            Suggested Title
                          </Label>
                          <p className="rounded-md border bg-background p-3 text-sm">
                            {aiSuggestions.optimizedTitle}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold">
                            Suggested Description
                          </Label>
                          <p className="rounded-md border bg-background p-3 text-sm">
                            {aiSuggestions.optimizedDescription}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="button" onClick={applyAiSuggestions}>
                          Apply Suggestions
                        </Button>
                      </CardFooter>
                    </Card>
                  )}

                  <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="video" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Video
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="image" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Image
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-2">
                    <Label>Media File</Label>
                    <div className="flex w-full items-center justify-center">
                      <label
                        htmlFor="dropzone-file"
                        className={cn(
                          'flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card transition-colors',
                          'group-disabled:cursor-not-allowed group-disabled:bg-muted/50',
                          'hover:bg-accent'
                        )}
                      >
                        {file ? (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                            <CheckCircle className="mb-3 h-10 w-10 text-green-500" />
                            <p className="font-semibold">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <span className="mt-2 text-sm text-primary">
                              Click or drag to replace
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="mb-3 h-10 w-10 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">
                                Click to upload
                              </span>{' '}
                              or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Video or Image (MAX. 500MB)
                            </p>
                          </div>
                        )}
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept="video/*,image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {fileError && (
                      <p className="text-sm font-medium text-destructive">
                        {fileError}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto">
                    {isLoading ? 'Submitting...' : 'Submit for Review'}
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
