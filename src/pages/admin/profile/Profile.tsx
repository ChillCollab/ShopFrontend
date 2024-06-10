import './profile.scss';
import InputLabelEmailChange from '../../../components/inputs/InputLabelEmailChange.tsx';
import { InputLabelPasswordClean } from '../../../components/inputs/InputLabelPasswordClean.tsx';
import { InputPhoneNumberDisabled } from '../../../components/inputs/InputPhoneNumberDisabled.tsx';
import { EditPersonalModal } from './editPersonal.tsx';
import { useEffect, useState } from 'react';
import { ChangePasswordModal } from './changePassword.tsx';
import { ChangeEmailModal } from './changeEmail.tsx';
import { ChangeEmailSubmitModal } from './changeEmailSubmit.tsx';
import { MainSpinner } from '../../../components/spinners/MainSpinner.tsx';
import { ChangePhoneNumber } from './changePhoneNumber.tsx';
import authRequests, { User } from '../../auth/requests/auth.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/systemAlertSlices.ts';
import { storage } from '../../../storage/storage.ts';

function Profile() {
  const [isUser, setIsUser] = useState<User>({} as User);
  const [isActivePersonal, setIsActivePersonal] = useState<boolean>(false);
  const [isActivePassword, setIsActivePassword] = useState<boolean>(false);
  const [isActiveEmail, setIsActiveEmail] = useState<boolean>(false);
  const [isActiveEmailSubmit, setIsActiveEmailSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isActiveNumber, setIsActiveNumber] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    authRequests
      .userInfo()
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          localStorage.setItem(storage.userData, JSON.stringify(res.data));
          setIsUser(res.data);
        }
      })
      .catch((e: AxiosError<{ message: string }>) => {
        if (e?.response?.status === 500) {
          dispatch(addAlert({ message: 'Internal server error', type: 'error' }));
          return;
        }
        if (e?.response) dispatch(addAlert({ message: e?.response?.data?.message, type: 'error' }));
      });
    setIsLoading(false);
  }, [dispatch, isActiveNumber, isActivePersonal]);

  return isLoading ? (
    <MainSpinner isLoading={isLoading} />
  ) : (
    <>
      <ChangePhoneNumber active={isActiveNumber} setIsActive={setIsActiveNumber} />
      <EditPersonalModal active={isActivePersonal} setIsActive={setIsActivePersonal} />
      <ChangePasswordModal active={isActivePassword} setIsActive={setIsActivePassword} />
      <ChangeEmailModal active={isActiveEmail} setIsActive={setIsActiveEmail} setIsActiveSub={setIsActiveEmailSubmit} />
      <ChangeEmailSubmitModal active={isActiveEmailSubmit} setIsActive={setIsActiveEmailSubmit} />
      <div className="profile">
        <h1>Profile</h1>
        <div className="userInfo">
          {isUser?.avatar_id === '' ? (
            <img src={'/noavatar.png'} className="avatar" alt="avatar" />
          ) : (
            <img src={isUser?.avatar_id} className="avatar" alt="avatar" />
          )}
          <div className="infoContainer">
            <div className="fioContainer">
              <div className="fio">{`${isUser?.name} ${isUser?.surname}`}</div>
            </div>
            <div className="loginCase">
              <div className="log">{isUser?.login}</div>
              <div onClick={() => setIsActivePersonal(true)}>
                <svg
                  className={'edit-info-btn'}
                  width="20"
                  height="20"
                  viewBox="0 -2.5 20 20"
                  fill="#ABABAB"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.9827 2.48176C14.4515 2.01322 15.0872 1.75 15.75 1.75C16.4131 1.75 17.049 2.0134 17.5178 2.48226C17.9867 2.95112 18.2501 3.58702 18.2501 4.25009C18.2501 4.91291 17.9869 5.54859 17.5184 6.0174C17.5182 6.01757 17.5185 6.01722 17.5184 6.0174L16.4591 7.08043C16.4318 7.12165 16.4 7.16077 16.3637 7.19709C16.328 7.23274 16.2897 7.26406 16.2493 7.29104L10.5313 13.0295C10.3906 13.1707 10.1994 13.2501 10 13.2501H7.50001C7.0858 13.2501 6.75001 12.9143 6.75001 12.5001V10.0001C6.75001 9.80071 6.8294 9.60954 6.97063 9.46881L12.7091 3.75084C12.736 3.71044 12.7674 3.67209 12.803 3.63643C12.8393 3.60011 12.8785 3.56829 12.9197 3.54098L13.9827 2.48176C13.9828 2.4816 13.9825 2.48193 13.9827 2.48176ZM13.3428 5.23689L8.25001 10.3115V11.7501H9.68857L14.7632 6.65729L13.3428 5.23689ZM15.822 5.59473L14.4054 4.17812L15.0428 3.54292C15.2304 3.35537 15.4848 3.25 15.75 3.25C16.0153 3.25 16.2696 3.35537 16.4572 3.54292C16.6447 3.73047 16.7501 3.98485 16.7501 4.25009C16.7501 4.51533 16.6447 4.76971 16.4572 4.95726L15.822 5.59473ZM3.29117 5.79125C3.74438 5.33803 4.35907 5.08342 5.00001 5.08342H5.83334C6.24756 5.08342 6.58334 5.41921 6.58334 5.83342C6.58334 6.24764 6.24756 6.58342 5.83334 6.58342H5.00001C4.7569 6.58342 4.52374 6.68 4.35183 6.85191C4.17992 7.02382 4.08334 7.25697 4.08334 7.50009V15.0001C4.08334 15.2432 4.17992 15.4764 4.35183 15.6483C4.52374 15.8202 4.7569 15.9168 5.00001 15.9168H12.5C12.7431 15.9168 12.9763 15.8202 13.1482 15.6483C13.3201 15.4764 13.4167 15.2432 13.4167 15.0001V14.1668C13.4167 13.7525 13.7525 13.4168 14.1667 13.4168C14.5809 13.4168 14.9167 13.7525 14.9167 14.1668V15.0001C14.9167 15.641 14.6621 16.2557 14.2089 16.7089C13.7556 17.1621 13.141 17.4168 12.5 17.4168H5.00001C4.35907 17.4168 3.74438 17.1621 3.29117 16.7089C2.83796 16.2557 2.58334 15.641 2.58334 15.0001V7.50009C2.58334 6.85915 2.83796 6.24446 3.29117 5.79125Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="info-change">
          <form className="inputs">
            <InputLabelEmailChange
              disabled={true}
              id={'email'}
              error={false}
              label={'Email'}
              size={'medium'}
              value={isUser?.email}
              style={{ maxWidth: '510px', minWidth: '320px', maxHeight: '56px' }}
              onChange={(e) => console.log(e)}
              onKeyDown={(e) => console.log(e)}
              onFocus={(e) => console.log(e)}
              onClick={() => setIsActiveEmail(true)}
            />
            <div className="pass-cnt">
              <InputLabelPasswordClean
                disabled={true}
                label={'Password'}
                value={'password'}
                style={{ maxWidth: '510px', minWidth: '320px', maxHeight: '56px' }}
                size={'medium'}
              />
              <div className="change-password" onClick={() => setIsActivePassword(true)}>
                Change password
              </div>
            </div>
            <InputPhoneNumberDisabled
              disabled={true}
              id={'phone'}
              label={'Phone number'}
              value={isUser?.phone}
              style={{ maxWidth: '510px', minWidth: '320px', maxHeight: '56px', color: 'white' }}
              size={'medium'}
              onChange={(e) => console.log(e)}
              onKeyDown={(e) => console.log(e)}
              onFocus={(e) => console.log(e)}
              onClick={() => {
                setIsActiveNumber(true);
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
