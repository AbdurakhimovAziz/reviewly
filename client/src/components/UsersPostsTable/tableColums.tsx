import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Post } from 'interfaces';
import { TableActions } from './components';

const dateGetter = (params: GridValueGetterParams) => {
  const post = params.row as Post;
  return new Date(post.createdAt).toLocaleDateString();
};

export const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'reviewedItem',
    headerName: 'Reviewed Item',
    width: 150,
    editable: true,
  },
  {
    field: 'group',
    headerName: 'Group',
    width: 110,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 160,
    valueGetter: dateGetter,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At',
    width: 160,
    valueGetter: dateGetter,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 250,
    sortable: false,
    editable: false,
    renderCell: (params) => {
      return <TableActions postId={params.row._id} />;
    },
  },
];
