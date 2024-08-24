import { SignJWT, jwtVerify } from 'jose';

import { encrypt, decrypt, createSession, deleteSession, getSession } from '@/actions/session';

jest.mock('jose', () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue('mockedToken'),
  })),
  jwtVerify: jest.fn(),
}));

const mockCookie = {
  set: jest.fn(),
  get: jest.fn(),
  delete: jest.fn(),
};

jest.mock('next/headers', () => ({
  cookies: () => mockCookie,
}));

jest.mock('@/env', () => ({
  env: {
    SESSION_SECRET: 'SESSION_SECRET',
  },
}));

describe('session', () => {
  const payload = { userId: '12345' };
  const encodedKey = new TextEncoder().encode('SESSION_SECRET');

  describe('encrypt', () => {
    it('should sign the JWT with the correct payload and return the token', async () => {
      const result = await encrypt(payload);

      expect(SignJWT).toHaveBeenCalledWith(payload);
      expect(result).toBe('mockedToken');
    });
  });

  describe('decrypt', () => {
    it('should return the payload if the JWT verification is successful', async () => {
      jwtVerify.mockResolvedValueOnce({ payload });
      const result = await decrypt('mockedToken');

      expect(jwtVerify).toHaveBeenCalledWith('mockedToken', encodedKey, { algorithms: ['HS256'] });
      expect(result).toEqual(payload);
    });

    it('should return null if the JWT verification fails', async () => {
      jwtVerify.mockRejectedValueOnce(new Error('Invalid token'));

      const result = await decrypt('invalidToken');

      expect(result).toBeNull();
    });
  });

  describe('createSession', () => {
    it('should create and set a session cookie with the correct values', async () => {
      const mockExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await createSession(payload);

      expect(mockCookie.set).toHaveBeenCalledWith({
        name: 'session',
        value: 'mockedToken',
        httpOnly: true,
        expires: mockExpiresAt,
        sameSite: 'lax',
      });
    });
  });

  describe('deleteSession', () => {
    it('should delete the session cookie', async () => {
      await deleteSession();

      expect(mockCookie.delete).toHaveBeenCalledWith('session');
    });
  });

  describe('getSession', () => {
    it('should return the session if it exists and is valid', async () => {
      mockCookie.get.mockReturnValueOnce({ value: 'mockedToken' });
      jwtVerify.mockResolvedValueOnce({ payload });

      const result = await getSession();

      expect(result).toEqual(payload);
    });

    it('should return null if the session does not exist or is invalid', async () => {
      mockCookie.get.mockReturnValueOnce(null);

      const result = await getSession();

      expect(result).toBeNull();
    });
  });
});
