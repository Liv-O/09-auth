import api from '@/lib/api/api';

import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { cookies } from 'next/headers';

interface HTTPGetResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  currentPage: number,
  search: string,
  category?: string
): Promise<HTTPGetResponse> => {
  const cookieStore = await cookies();
  const getParams = {
    params: {
      search,
      page: currentPage,
      perPage: 12,
      tag: category,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  };

  const data = await api.get<HTTPGetResponse>('/notes', getParams);

  return data.data;
};

export const getSingleNote = async (id: string) => {
  const cookieStore = await cookies();
  const getSingleParams = {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };

  const { data } = await api.get<Note>(`/notes/${id}`, getSingleParams);

  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
