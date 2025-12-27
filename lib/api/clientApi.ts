import type { Note, NewNote } from '@/types/note';

import api from '@/lib/api/api';
import User from '@/types/user';

interface HTTPGetResponse {
  notes: Note[];
  totalPages: number;
}

interface RegisterPayload {
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface CheckSessionResponse {
  success: boolean;
}

export type UpdateUserRequest = {
  username?: string;
};

export const fetchNotes = async (
  currentPage: number,
  search: string,
  category?: string
): Promise<HTTPGetResponse> => {
  const getParams = {
    params: {
      search,
      page: currentPage,
      perPage: 12,
      tag: category,
    },
  };

  const data = await api.get<HTTPGetResponse>('/notes', getParams);

  return data.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const getSingleNote = async (id: string) => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const register = async (payload: RegisterPayload): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginPayload): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post<User>('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get<CheckSessionResponse>('/auth/session');
  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await api.patch<User>('/users/me', payload);
  return res.data;
};
