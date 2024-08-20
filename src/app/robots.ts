import type { MetadataRoute } from 'next';

import { env } from '@/env';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${env.NEXT_PUBLIC_VERCEL_URL}/sitemap.xml`,
  };
}
