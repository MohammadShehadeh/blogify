import type { MetadataRoute } from 'next';

import { env } from '@/env';

// This allows to generate a `sitemap.xml` file dynamically based on the needs of your Website
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${env.NEXT_PUBLIC_VERCEL_URL}`,
      lastModified: new Date(),
      changeFrequency: 'always',
    },
  ];
}
