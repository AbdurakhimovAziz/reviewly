import { UsersPostsTableProps } from './types';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './tableColums';

export const UsersPostsTable = ({ posts }: UsersPostsTableProps) => {
  return (
    <DataGrid
      columns={columns}
      rows={posts}
      getRowId={(row) => row._id}
      disableRowSelectionOnClick
    />
  );
};
