import css from '@/app/home.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notehub',
  description:
    'App for writing your personal notes and reminders.  This page not found!',
  openGraph: {
    title: 'Notehub',
    description:
      'App for writing your personal notes and reminders. This page not found!',
    url: 'https://08-zustand-ten-ebon.vercel.app/',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
