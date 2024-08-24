'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createComment } from '@/actions/comment';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { usePost } from '@/providers/post-provider';
import type { CommentingFormValues } from '@/types/zod-schema';
import { commentingFormSchema } from '@/types/zod-schema';

export function CommentingForm() {
  const { id: postId } = usePost();
  const { toast } = useToast();
  const form = useForm<CommentingFormValues>({
    resolver: zodResolver(commentingFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: CommentingFormValues) {
    const results = await createComment(postId, values.content);

    if (results && 'error' in results.response) {
      toast({
        title: results.response.title,
        description: results.response.message,
        variant: 'destructive',
      });

      return;
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="mt-4" placeholder="Write your comment..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Icons.loader className="mr-2 size-4 animate-spin" />} Comment
        </Button>
      </form>
    </Form>
  );
}
