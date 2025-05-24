'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';

interface UserProfile {
  username: string;
  email: string;
  favourite_saccos?: string[];
}

export function useAuth(requireAuth = true) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');

      if (!token && requireAuth) {
        router.push('/auth/login');
        setLoading(false);
        return;
      }

      if (token) {
        try {
          const response = await axiosInstance.get('/customers/profile/');
          setUser(response.data);
        } catch (error) {
          if (requireAuth) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            router.push('/auth/login');
          }
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, requireAuth]);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/auth/login');
  };

  return { user, loading, logout };
}