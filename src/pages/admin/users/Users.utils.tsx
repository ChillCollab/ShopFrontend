import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerAlign: 'center',
    headerClassName: 'headerBox',
    cellClassName: 'idClass',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'img',
    headerName: 'Avatar',
    headerAlign: 'center',
    cellClassName: 'nameCell',
    headerClassName: 'headerBox',
    width: 80,
    renderCell: (params: any) => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    },
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'First name',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'headerBox',
    cellClassName: 'nameCell',
  },
  {
    field: 'surname',
    type: 'string',
    headerName: 'Last name',
    width: 175,
    cellClassName: 'nameCell',
    headerAlign: 'center',
    headerClassName: 'headerBox',
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 200,
    cellClassName: 'emailCell',
    headerAlign: 'center',
    headerClassName: 'headerBox',
  },
  {
    field: 'created',
    headerName: 'Created At',
    flex: 0.05,
    type: 'string',
    cellClassName: 'createCell',
    headerAlign: 'center',
    headerClassName: 'headerBox',
  },
  {
    field: 'updated',
    headerName: 'Updated At',
    flex: 0.05,
    type: 'string',
    cellClassName: 'createCell',
    headerAlign: 'center',
    headerClassName: 'headerBox',
  },
  {
    field: 'active',
    headerName: 'Activated',
    flex: 0.05,
    type: 'boolean',
    cellClassName: 'verifiedCell',
    headerAlign: 'center',
    headerClassName: 'headerBox',
    renderCell: (params) => {
      return params.value ? (
        <img src="/public/assets/icons/verified.svg" alt="Verified" />
      ) : (
        <img src="/public/assets/icons/notverified.svg" alt="Not Verified" />
      );
    },
  },
];
