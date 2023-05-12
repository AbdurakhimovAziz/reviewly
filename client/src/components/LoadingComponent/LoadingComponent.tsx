import { CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';
import { LoadingComponentProps } from './types';

export const LoadingComponent = ({
  isError,
  isLoading,
  isFetching,
  children,
}: PropsWithChildren<LoadingComponentProps>) => {
  if (isLoading || isFetching) {
    return <CircularProgress />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return <>{children}</>;
};
