import { Badge } from './ui/badge';

export const Hero = () => {
  return (
    <div className="relative mb-4 mt-2">
      <Badge>Join the Community</Badge>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Share Your Stories, Discover New Perspectives
      </h1>
      <p className="text-md mt-2 leading-6 text-gray-600 sm:text-lg">
        Sign up today to start posting your thoughts, stories, and insights. Connect with others, share ideas, and
        explore a world of diverse perspectives, all in one place.
      </p>
    </div>
  );
};
