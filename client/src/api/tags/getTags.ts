import axiosInstance from 'api/axios';

const getTags = async (limit = 10) => {
  const { data } = await axiosInstance.get('/tags', {
    params: {
      limit,
    },
  });
  return data;
};
