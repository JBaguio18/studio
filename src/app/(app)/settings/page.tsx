'use client';

import { useTheme } from 'next-themes';
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  // State for font size
  const [fontSize, setFontSize] = useState(100);
  // State for high contrast
  const [isHighContrast, setIsHighContrast] = useState(false);
  // State for reduce motion
  const [isReduceMotion, setIsReduceMotion] = useState(false);

  // Effect to apply font size to the root element
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Effect to toggle high-contrast class on the root element
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', isHighContrast);
  }, [isHighContrast]);

  // Effect to toggle reduce-motion class on the root element
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', isReduceMotion);
  }, [isReduceMotion]);

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Customize your PLXYGROUND experience."
      />
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Manage your account settings and set e-mail preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Password</Label>
                <Button variant="outline">Change Password</Button>
                <p className="text-sm text-muted-foreground">
                  It's a good idea to use a strong password that you're not
                  using elsewhere.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance & Accessibility</CardTitle>
              <CardDescription>
                Customize the look and feel to your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode" className="text-base">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Adjust the appearance to reduce eye strain.
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? 'dark' : 'light');
                  }}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast-mode" className="text-base">
                    High Contrast Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Improve legibility with a higher contrast theme.
                  </p>
                </div>
                <Switch
                  id="high-contrast-mode"
                  checked={isHighContrast}
                  onCheckedChange={setIsHighContrast}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="reduce-motion" className="text-base">
                    Reduce Motion
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Prefer less animation and motion in the app.
                  </p>
                </div>
                <Switch
                  id="reduce-motion"
                  checked={isReduceMotion}
                  onCheckedChange={setIsReduceMotion}
                />
              </div>

              <div className="rounded-lg border p-4">
                <div className="space-y-0.5 mb-4">
                  <Label className="text-base">Font Size</Label>
                  <p className="text-sm text-muted-foreground">
                    Adjust the text size for comfortable reading.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-sm font-medium">Aa</span>
                  <Slider
                    defaultValue={[fontSize]}
                    min={80}
                    max={140}
                    step={10}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                  <span className="text-2xl font-medium">Aa</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="comments-notifications"
                    className="text-base"
                  >
                    Comments
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for new comments on your clips.
                  </p>
                </div>
                <Switch id="comments-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="followers-notifications"
                    className="text-base"
                  >
                    New Followers
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone new follows you.
                  </p>
                </div>
                <Switch id="followers-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails" className="text-base">
                    Marketing Emails
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features, products, and special
                    offers.
                  </p>
                </div>
                <Switch id="marketing-emails" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Preferences</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
