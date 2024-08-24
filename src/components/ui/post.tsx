import React, { type PropsWithChildren } from 'react';

interface PostImageProps {
  image: string;
  alt: string;
}

const Post = ({ children }: PropsWithChildren) => {
  return <section className="my-8">{children}</section>;
};

const PostHeader = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col space-y-1.5">{children}</div>;
};

const PostContent = ({ children }: PropsWithChildren) => {
  return <div className="p-6 pt-0">{children}</div>;
};

const PostImage = ({ image, alt }: PostImageProps) => {
  return (
    <div
      className="mb-4 h-96 w-full bg-cover bg-center bg-repeat"
      style={{
        backgroundImage: `url("${image}")`,
      }}
    >
      <p className="sr-only">{alt}</p>
    </div>
  );
};

const PostBody = ({ children }: { children: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: children }}></div>;
};

const PostTitle = ({ children }: PropsWithChildren) => {
  return <h1 className="text-4xl">{children}</h1>;
};

const PostDescription = ({ children }: PropsWithChildren) => {
  return <p className="text-lg">{children}</p>;
};

export { Post, PostHeader, PostContent, PostImage, PostBody, PostTitle, PostDescription };
