import { QueryKeys } from 'api';
import { getPost } from 'api/posts';
import { LoadingComponent } from 'components/LoadingComponent';
import { AddEditPostForm } from 'forms/AddEditPost/AddEditPost';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { routePaths } from 'router';

export const UpdatePostPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <Navigate to={routePaths.HOME} />;

  const { data, isError, isLoading } = useQuery([QueryKeys.POST, id], () =>
    getPost(id)
  );

  if (!data) {
    return <LoadingComponent isError={isError} isLoading={isLoading} />;
  }

  return <AddEditPostForm post={data}></AddEditPostForm>;
};
