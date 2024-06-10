import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import './delete.scss';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import adminReqs from '../../../requests/admin/admin.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { addAlert } from '../../../store/systemAlertSlices.ts';
import { isLogin } from '../../../store/userDataSlices.ts';
import React from 'react';

interface DeleteProps {
  user: UserInfo;
  open: boolean;
  setOpen: (arg: boolean) => void;
  setIsUsers: (arg: any) => void;
  isUsers: any;
}

interface UserInfo {
  id: number;
  name: string;
  surname: string;
  login: string;
  email: string;
}

export const Delete: React.FC<any> = (props: DeleteProps) => {
  const userLogin = useSelector((state: RootState) => state.deleteUser.isDeleteLogin);
  const userId = useSelector((state: RootState) => state.deleteUser.isDeleteId);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const deleteUser = () => {
    setIsLoading(true);
    adminReqs
      .deleteUsers(userId)
      .then((deleteResponse: AxiosResponse<any>) => {
        if (deleteResponse?.data) {
          const updateUsers = props.isUsers.filter((user: { id: number }) => user.id !== userId[0]);
          props.setIsUsers(updateUsers);
          dispatch(addAlert({ message: `User ${userLogin} deleted`, type: 'success' }));
        }
      })
      .catch((e: AxiosError<any>) => {
        dispatch(addAlert({ message: e?.response?.data?.message, type: 'error' }));
      })
      .finally(() => {
        props.setOpen(false);
        setIsLoading(false);
      });
  };

  return (
    <ModalContainer closeButton={false} active={props.open} setIsActive={props.setOpen}>
      <div className={'delete-user-modal'}>
        <div className={'delete-text'}>
          Are you sure you want to delete the user(s)?
          <div className={'delete-text-users'}>{userLogin}</div>
        </div>
        <div className={'delete-btm-container'}>
          <div className={'delete-submit'}>
            <LoadingBtnModal loading={isLoading} title={'Submit'} onClick={() => deleteUser()} />
          </div>
          <div className={'delete-cancel'}>
            <LoadingBtnModal loading={false} title={'Cancel'} onClick={() => props.setOpen(false)} />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
