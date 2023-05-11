import { useParams } from 'react-router-dom';

export const UpdatePostPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  return <div>UpdatePostPage</div>;
};
