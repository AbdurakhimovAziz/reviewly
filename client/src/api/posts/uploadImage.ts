import axios from 'axios';

export const uploadImage = async (
  file: File
): Promise<{ secure_url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'reviewly');
  const { data } = await axios.post(
    'https://api.cloudinary.com/v1_1/dwx3ott96/image/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};
