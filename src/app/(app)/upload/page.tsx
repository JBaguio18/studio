'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';

export default function UploadPage() {
  return (
    <>
      <PageHeader title="Upload New Clip" subtitle="Share your latest highlight with the world." />
      <div className="mt-8 flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Clip Details</CardTitle>
            <CardDescription>
              Fill out the information below to upload your new clip.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="My Awesome Play" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="A short description of your clip..." />
            </div>
            <div className="grid gap-2">
              <Label>Video File</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">MP4, MOV, or WEBM (MAX. 500MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div> 
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Upload Clip</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
