import { QueryKeys } from 'api';
import { LoadingComponent } from 'components/LoadingComponent';
import { AddEditPostForm } from 'forms/AddEditPost/AddEditPost';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export const UpdatePostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading } = useQuery(
    [QueryKeys.POST, id],
    () => {},
    { enabled: false }
  );
  console.log(id);

  if (!data) {
    return <LoadingComponent isError={isError} isLoading={isLoading} />;
  }

  return <AddEditPostForm post={data}></AddEditPostForm>;
};
