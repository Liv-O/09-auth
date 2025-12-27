'use client';

import { ApiError } from '@/app/api/api';
import css from '@/components/AuthNavigation/AuthNavigation.module.css';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AuthNavigation = () => {
  const { isAuthenticated, clearIsAuthenticated, user } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log('Successful logout');
      clearIsAuthenticated();
      router.push('/');
    },
    onError: (error) => {
      const err = error as ApiError;

      setError(
        err.response?.data?.validation?.body?.message ??
          err.response?.data?.message ??
          err.message
      );
    },
  });
  const handleLogOut = () => {
    mutate();
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button
              className={css.logoutButton}
              onClick={handleLogOut}>
              Logout
            </button>
          </li>
        </>
      )}
      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}>
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
