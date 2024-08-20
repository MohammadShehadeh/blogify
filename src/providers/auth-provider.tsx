'use client';

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useRef } from 'react';

import { deleteCookie } from '@/actions/cookies';
import { env } from '@/env';
import { getInitials } from '@/utils/strings';

interface AuthContextValue {
  token?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarName?: string;
  credits?: string;
  logout?(): void;
  image?: string;
}

const authDefaultValue: AuthContextValue = {};

interface AuthProviderProps extends PropsWithChildren, AuthContextValue {}

const AuthContext = createContext(authDefaultValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, ...restProps }: AuthProviderProps) => {
  const userInfo = useRef<AuthContextValue>(restProps);
  const { lastName = '', firstName = '', image = '' } = restProps || {};
  const fullName = `${firstName} ${lastName}`.trim();
  const fullImage = image ? `${env.NEXT_PUBLIC_CLARITY_KIT_URL}/${image}` : '';
  const avatarName = getInitials(fullName);

  const logout = () => deleteCookie();

  const values = {
    ...userInfo.current,
    fullName,
    avatarName,
    image: fullImage,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
