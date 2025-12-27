'use client';
import css from '@/app/(auth routes)/sign-up/SignUpPage.module.css';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/lib/store/authStore';

const SignUpPage = () => {
  const [signError, setError] = useState<string | null>(null);
  const { setUser } = useAuthStore();

  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      // console.log('Successful registration ', user);
      setUser(user);
      router.push('/profile');
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

  const handleSubmit = (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    mutate({ email, password });
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form
        className={css.form}
        action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}>
            Register
          </button>
        </div>
        {signError && <p className={css.error}>{signError}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
