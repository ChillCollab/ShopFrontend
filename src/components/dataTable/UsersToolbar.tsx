import { GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';
import './usersToolbar.scss';
import { useDispatch } from 'react-redux';
import { isDeleteId, isDeleteLogin } from '../../store/deleteUserSlices.ts';
import { memo } from 'react';
import { User } from '../../pages/admin/users/Users.types.ts';

interface UsersToolbarProps {
  selectedRows: User[];
  allRowsCount: number;
  rows: User[];
  isDelete: boolean;
  setIsDelete: (arg: boolean) => void;
  isOpenEdit: boolean;
  setIsOpenEdit: (arg: boolean) => void;
  setIsUserData: (arg: User) => void;
}

const UsersToolbar = (props: UsersToolbarProps) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const logins: string[] = [];
    props.selectedRows.forEach((item) => {
      logins.push(item.login);
    });
    dispatch(isDeleteLogin({ isDeleteLogin: logins.join(', ') }));
    dispatch(isDeleteId({ isDeleteId: props.selectedRows.map((item) => item.id) }));
    props.setIsDelete(true);
  };

  const handleEdit = (user: User) => {
    props.setIsOpenEdit(true);
    props.setIsUserData(user);
  };

  return (
    <div className={'users-toolbar-container'}>
      <div className={'users-toolbar-filter-container'}>
        <GridToolbarQuickFilter />
        {props.selectedRows.length > 0 ? (
          <div className={'users-toolbar-selected-container-container'}>
            <div className={'users-toolbar-selected-container'}>
              <p>
                Selected: {props.selectedRows.length} out of {props.allRowsCount}
              </p>
            </div>
            <div
              onClick={() => handleDelete()}
              className={props.selectedRows.length > 0 ? 'delete-button-container' : 'delete-button-container'}
            >
              {props.selectedRows.length > 0 ? <img key={'button-img-delete'} src="/delete.svg" alt="" /> : null}
            </div>
            <div
              className={
                props.selectedRows.length === 1 ? 'edit-button-container-display' : 'edit-button-container-none'
              }
            >
              <img
                onClick={() => handleEdit(props.selectedRows[0])}
                key={props.selectedRows[0] + '-img'}
                src="/view.svg"
                alt=""
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <GridToolbarExport />
    </div>
  );
};

export default memo(UsersToolbar);
