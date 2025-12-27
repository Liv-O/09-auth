import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_UR + '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// // export const getCategories = async () => {
// //   const getCategoriesParams = {
// //     headers: {
// //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
// //     },
// //   };

// //   const { data } = await axios.get<Category[]>(
// //     `https://notehub-public.goit.study/api/categories`,
// //     getCategoriesParams
// //   );
// //   console.log(data);
// //   return data;
// // };
