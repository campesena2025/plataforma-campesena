import api, { withAuth } from './api/axios-interceptor';

import { Media } from '@/types/media';

export const uploadFile = async (file: File): Promise<Media[]> => {
  const formData = new FormData();

  formData.append('files', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...withAuth(),
  });

  return response.data;
};
