import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../../components/dataTable/DataTable.tsx';
import './Users.scss';
import { useEffect, useState } from 'react';
import Add from '../../../components/add/Add.tsx';
import adminReqs from '../../../requests/admin/admin.ts';

const columns: GridColDef[] = [
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
    renderCell: (params) => {
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
        <img src="/verified.svg" alt="Verified" />
      ) : (
        <img src="/notverified.svg" alt="Not Verified" />
      );
    },
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [isUsers, setIsUsers] = useState([]);

  useEffect(() => {
    adminReqs
      .getUsers()
      .then((res) => setIsUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>
          <img src="/adduser.svg" alt="" />
          Add User
        </button>
      </div>
      <DataTable slug="users" columns={columns} rows={isUsers} />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
