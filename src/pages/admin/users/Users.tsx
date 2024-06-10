import DataTable from '../../../components/dataTable/DataTable.tsx';
import './users.scss';
import { useEffect, useState } from 'react';
import Add from './Add.tsx';
import adminReqs from '../../../requests/admin/admin.ts';
import { MainSpinner } from '../../../components/spinners/MainSpinner.tsx';
import { Button } from '@mui/material';
import { Delete } from './Delete.tsx';
import { GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isDeleteId, isDeleteLogin } from '../../../store/deleteUserSlices.ts';
import { RootState } from '../../../store';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [isUsers, setIsUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelete, setIsDelete] = useState(false);

  const isId = useSelector((state: RootState) => state.deleteUser.isDeleteId);

  const dispatch = useDispatch();
  const handleDelete = (id: number, login: any) => {
    console.log(isId);
    dispatch(isDeleteLogin({ isDeleteLogin: login }));
    dispatch(isDeleteId({ isDeleteId: [id] }));

    setIsDelete(true);
  };

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
      field: 'avatar_id',
      headerName: 'Avatar',
      headerAlign: 'center',
      cellClassName: 'nameCell',
      headerClassName: 'headerBox',
      width: 80,
      renderCell: (params) => {
        return <img style={{ height: '38px', width: '38px' }} src={params.row.avatar_id || '/noavatar.png'} alt="" />;
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
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      headerAlign: 'center',
      headerClassName: 'headerBox',
      renderCell: (params) => {
        return (
          <div className="action">
            <Link key={params.row.id + '-link'} to={`${params.row.id}`}>
              <img key={params.row.id + '-img'} src="/view.svg" alt="" />
            </Link>
            <div
              key={params.row.id + '-div'}
              className="delete"
              onClick={() => handleDelete(params.row.id, params.row.name + ' ' + params.row.surname)}
            >
              <img key={params.row.id + '-img-delete'} src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    adminReqs
      .getUsers()
      .then((res) => {
        setIsUsers(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const AddSvg = () => {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.24512 8.30082C6.26387 8.30082 4.65137 6.62113 4.65137 4.55733C4.65137 2.49353 6.26387 0.813843 8.24512 0.813843C10.2264 0.813843 11.8389 2.49353 11.8389 4.55733C11.8389 6.62113 10.2264 8.30082 8.24512 8.30082ZM8.24512 1.79041C6.78262 1.79041 5.58887 3.03389 5.58887 4.55733C5.58887 6.08077 6.78262 7.32426 8.24512 7.32426C9.70762 7.32426 10.9014 6.08077 10.9014 4.55733C10.9014 3.03389 9.70762 1.79041 8.24512 1.79041Z"
          fill="black"
        />
        <path
          d="M2.87646 14.8112C2.62021 14.8112 2.40771 14.5898 2.40771 14.3229C2.40771 11.543 5.02646 9.27734 8.24521 9.27734C8.87646 9.27734 9.49521 9.362 10.0952 9.53778C10.3452 9.60939 10.489 9.87631 10.4202 10.1367C10.3515 10.3971 10.0952 10.5469 9.84521 10.4753C9.33271 10.3255 8.79521 10.2539 8.24521 10.2539C5.54521 10.2539 3.34521 12.0768 3.34521 14.3229C3.34521 14.5898 3.13271 14.8112 2.87646 14.8112Z"
          fill="black"
        />
        <path
          d="M11.9951 14.8112C11.2576 14.8112 10.5576 14.5248 10.0139 14.0105C9.79511 13.8152 9.60136 13.5743 9.45136 13.3073C9.17636 12.8386 9.02637 12.2852 9.02637 11.7188C9.02637 10.905 9.32636 10.1433 9.86386 9.56384C10.4264 8.95838 11.1826 8.62634 11.9951 8.62634C12.8451 8.62634 13.6514 9.00396 14.2014 9.655C14.6889 10.2214 14.9639 10.9506 14.9639 11.7188C14.9639 11.9662 14.9326 12.2136 14.8701 12.448C14.8076 12.7409 14.6889 13.0469 14.5264 13.3139C14.0076 14.2383 13.0326 14.8112 11.9951 14.8112ZM11.9951 9.60291C11.4389 9.60291 10.9264 9.83076 10.5389 10.2409C10.1701 10.638 9.96387 11.1589 9.96387 11.7188C9.96387 12.1029 10.0639 12.4805 10.2576 12.806C10.3576 12.9883 10.4889 13.1511 10.6389 13.2878C11.0139 13.6459 11.4951 13.8412 11.9951 13.8412C12.7014 13.8412 13.3701 13.4506 13.7326 12.8191C13.8389 12.6368 13.9201 12.4284 13.9639 12.2266C14.0076 12.0574 14.0264 11.8946 14.0264 11.7253C14.0264 11.2045 13.8389 10.7032 13.5014 10.3126C13.1264 9.85683 12.5764 9.60291 11.9951 9.60291Z"
          fill="black"
        />
        <path
          d="M12.9325 12.194H11.0637C10.8075 12.194 10.595 11.9726 10.595 11.7057C10.595 11.4388 10.8075 11.2174 11.0637 11.2174H12.9325C13.1887 11.2174 13.4012 11.4388 13.4012 11.7057C13.4012 11.9726 13.1887 12.194 12.9325 12.194Z"
          fill="black"
        />
        <path
          d="M11.9951 13.1901C11.7389 13.1901 11.5264 12.9688 11.5264 12.7019V10.7552C11.5264 10.4883 11.7389 10.267 11.9951 10.267C12.2514 10.267 12.4639 10.4883 12.4639 10.7552V12.7019C12.4639 12.9753 12.2514 13.1901 11.9951 13.1901Z"
          fill="black"
        />
      </svg>
    );
  };

  return isLoading ? (
    <MainSpinner isLoading={isLoading} />
  ) : (
    <div className="users">
      <Add slug="user" columns={columns} setOpen={setOpen} open={open} />
      <Delete isUsers={isUsers} setIsUsers={setIsUsers} open={isDelete} setOpen={setIsDelete} />
      <div className="info">
        <h1>Users</h1>
        <Button
          className={'add-user'}
          component={'label'}
          role={undefined}
          variant={'contained'}
          tabIndex={-1}
          startIcon={<AddSvg />}
          onClick={() => setOpen(true)}
          sx={{
            textTransform: 'none',
          }}
        >
          <div className={'add-user-text'}>Add User</div>
        </Button>
      </div>
      <DataTable
        setIsDelete={setIsDelete}
        useAction={true}
        slug="users"
        columns={columns}
        rows={isUsers}
        useCheckbox={false}
      />
    </div>
  );
};

export default Users;
