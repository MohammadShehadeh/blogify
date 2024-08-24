import React from 'react';

import { Icons } from './icons';

export const EmptySection = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-gray-50 py-8">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">It's a bit empty here. </h2>
      <p className="max-w-md text-center text-gray-600">
        It looks like there are no posts here at the moment. Be the first to share your thoughts or ideas.
      </p>
      <Icons.empty className="my-4 size-10" />
    </section>
  );
};
