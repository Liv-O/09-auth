import { fetchNotes } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesByCategoryClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  return {
    title: `${category} category`,
    description: `All your notes filtered by ${category} category`,
    openGraph: {
      title: `Notes with ${category} category`,
      description: `App for writing your personal notes and reminders. Your "${category}" notes`,
      url: `https://08-zustand-ten-ebon.vercel.app/notes/filter/${category}`,
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
}

const NotesByCategory = async ({ params }: Props) => {
  const initialPage = 1;
  const initialSearch = '';
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  //   const response = await fetchNotes(initialPage, initialSearch, category);
  //   console.log(category);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', category, initialSearch, initialPage],
    queryFn: () => fetchNotes(initialPage, initialSearch, category),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesByCategoryClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
