import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import './edit.scss';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { User } from './Users.types.ts';
import React, { memo, useEffect, useState } from 'react';
import { BaseSelector } from '../../../components/selectors/Selectors.tsx';
import MainSwitch from '../../../components/switch/Switch.tsx';
import adminReqs from '../../../requests/admin/admin.ts';
import { addAlert } from '../../../store/systemAlertSlices.ts';
import { useDispatch } from 'react-redux';
import { usersListTrigger } from '../../../store/usersListTriggersSlice.ts';

type EditProps = {
  isOpenEdit: boolean;
  setIsOpenEdit: (arg: boolean) => void;
  user: User;
};

const Edit = (props: EditProps) => {
  const [isName, setIsName] = useState(props.user.name);
  const [isSurname, setIsSurname] = useState(props.user.surname);
  const [isLogin, setIsLogin] = useState(props.user.login);
  const [isEmail, setIsEmail] = useState(props.user.email);
  const [isPhone, setIsPhone] = useState(props.user.phone);
  const [isRole, setIsRole] = useState(props.user.role);
  const [isActive, setIsActive] = useState(props.user.active);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();

  const roles = [
    { id: 0, name: 'User', value: 'user' },
    { id: 1, name: 'Admin', value: 'admin' },
  ];

  const inputs = [
    {
      id: 'login',
      name: 'Login',
      type: 'text',
      value: props.user.login,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setIsLogin(e.target.value),
    },
    {
      id: 'name',
      name: 'Name',
      type: 'text',
      value: props.user.name,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setIsName(e.target.value),
    },
    {
      id: 'surname',
      name: 'Surname',
      type: 'text',
      value: props.user.surname,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setIsSurname(e.target.value),
    },
    {
      id: 'email',
      name: 'Email',
      type: 'text',
      value: props.user.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setIsEmail(e.target.value),
    },
    {
      id: 'phone',
      name: 'Phone',
      type: 'text',
      value: props.user.phone,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setIsPhone(e.target.value),
    },
  ];

  const saveChanges = () => {
    setIsLoading(true);
    adminReqs
      .changeUserData(props.user.id, isLogin, isName, isSurname, isEmail, isPhone, isRole, isActive)
      .then((res) => {
        setIsLoading(false);
        if (!res.data?.code) {
          props.setIsOpenEdit(false);
          dispatch(
            usersListTrigger({
              usersList: [props.user.id, isLogin, isName, isSurname, isEmail, isPhone, isRole, isActive],
            })
          );
          dispatch(addAlert({ message: 'User data changed', type: 'success' }));
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response?.data) {
          dispatch(addAlert({ message: e.response.data.message, type: 'error' }));
        }
      });
  };
  useEffect(() => {
    if (isName && isSurname && isLogin && isEmail && isPhone && isRole) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isName, isSurname, isLogin, isEmail, isPhone, isRole]);

  useEffect(() => {
    setIsName(props.user.name);
    setIsSurname(props.user.surname);
    setIsLogin(props.user.login);
    setIsEmail(props.user.email);
    setIsPhone(props.user.phone);
    setIsRole(props.user.role);
    setIsActive(props.user.active);
  }, [props.user]);

  return (
    <ModalContainer active={props.isOpenEdit} setIsActive={props.setIsOpenEdit}>
      <div className={'change-user-modal'}>
        <div className={'change-user-container'}>
          <div className={'change-text-container'}>
            <div className={'change-title'}>Edit user data</div>
          </div>
          <form className={'change-user-inputs-container'}>
            {inputs.map((input) => (
              <InputLabelText
                key={input.id}
                id={input.id}
                label={input.name}
                type={input.type}
                error={false}
                defaultValue={input.value}
                onChange={input.onChange}
                size={'medium'}
              />
            ))}
            <BaseSelector
              defaultValue={props.user.role}
              label={'Role'}
              options={roles}
              onChange={(e) => setIsRole(e.target.value)}
            />
            <LoadingBtnModal onClick={() => saveChanges()} loading={isLoading} title={'Reset password'} />
            <MainSwitch label={'Active'} onChange={() => setIsActive(!isActive)} checked={isActive} />
          </form>
          <div className={'save-changes-btn-container'}>
            <LoadingBtnModal
              onClick={() => saveChanges()}
              loading={isLoading}
              title={'Save changes'}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default memo(Edit);
