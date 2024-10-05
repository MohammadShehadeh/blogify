'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';

import { createPost, updatePost } from '@/actions/post';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { postFormSchema, type PostFormValues } from '@/types/zod-schema';

const PostEditor = dynamic(() => import('@/components/post-editor').then((mod) => mod.PostEditor), {
  loading: () => <Skeleton className="min-h-[426px] w-full" />,
  ssr: false,
});

export function PostForm({
  id,
  action,
  status = 'draft',
  title = '',
  description = '',
  imageUrl = '',
  content = '',
  userId,
}: Partial<PostFormValues & { action: 'create' | 'update' }>) {
  const { toast } = useToast();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title,
      status,
      description,
      imageUrl,
      content,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: PostFormValues) {
    const actionCallback = action === 'update' ? updatePost : createPost;
    const results = await actionCallback({ ...values, id, userId });

    if (results && 'error' in results.response) {
      toast({
        title: results.response.title,
        description: results.response.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image url</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <PostEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <div className="flex justify-start gap-3">
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" size="lg">
                      Draft
                    </Badge>
                    <Input
                      {...field}
                      className="size-5 accent-gray-500/80"
                      type="radio"
                      id="draft"
                      value="draft"
                      checked={field.value === 'draft'}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge size="lg">Published</Badge>
                    <Input
                      {...field}
                      className="size-5 accent-green-600"
                      type="radio"
                      id="published"
                      value="published"
                      checked={field.value === 'published'}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit" className="w-full capitalize" disabled={isSubmitting}>
          {isSubmitting && <Icons.loader className="mr-2 size-4 animate-spin" />} {action}
        </Button>
      </form>
    </Form>
  );
}
