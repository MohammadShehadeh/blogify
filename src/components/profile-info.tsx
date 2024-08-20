'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/providers/auth-provider';

export const ProfileInfo = () => {
  const { avatarName, image, fullName, email } = useAuth();

  return (
    <div className="flex flex-col-reverse items-start gap-3 md:flex-row">
      <div className="flex flex-wrap gap-3">
        <Avatar size="xl">
          <AvatarImage src={image} />
          <AvatarFallback>{avatarName}</AvatarFallback>
        </Avatar>
        <div className="text-muted-foreground">
          <h1 className="w-40 text-xl text-white">{fullName}</h1>
          <p className="text-sm">{email}</p>
        </div>
      </div>
    </div>
  );
};
