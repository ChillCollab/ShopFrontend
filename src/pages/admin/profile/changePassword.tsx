import React, { useEffect, useState } from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import { InputLabelPassword } from '../../../components/inputs/InputLabelPassword.tsx';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/systemAlertSlices.ts';

interface ChangePasswordProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordProps> = ({ active, setIsActive }) => {
  const [isShowOld, setIsShowOld] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowRepeat, setIsShowRepeat] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [state, setState] = useState({
    currentPassword: {
      value: '',
      error: false,
    },
    newPassword: {
      value: '',
      error: false,
    },
    repeatPassword: {
      value: '',
      error: false,
    },
  });

  const dispatch = useDispatch();

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      currentPassword: {
        value: e.target.value,
        error: false,
      },
    });
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      newPassword: {
        value: e.target.value,
        error: false,
      },
    });
  };
  const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      repeatPassword: {
        value: e.target.value,
        error: false,
      },
    });
  };

  const inputs = [
    {
      id: 'current-password',
      name: 'Current password',
      vision: isShowOld,
      error: state.currentPassword.error,
      setVision: setIsShowOld,
      handler: handleOldPassword,
      value: state.currentPassword.value,
    },
    {
      id: 'new-password',
      name: 'Password',
      vision: isShow,
      error: state.newPassword.error,
      setVision: setIsShow,
      handler: handlePassword,
      value: state.newPassword.value,
    },
    {
      id: 'repeat-password',
      name: 'Repeat password',
      vision: isShowRepeat,
      error: state.repeatPassword.error,
      setVision: setIsShowRepeat,
      handler: handleRepeatPassword,
      value: state.repeatPassword.value,
    },
  ];

  const changePassword = (oldPassword: string, newPassword: string) => {
    profileReqs
      .changePassword(oldPassword, newPassword)
      .then((res: any) => {
        if (res?.status === 200) {
          setIsActive(false);
          dispatch(addAlert({ message: 'Password has been changed successfully', type: 'success' }));
        }
      })
      .catch((e: any) => {
        setState({
          ...state,
          currentPassword: {
            value: '',
            error: true,
          },
          newPassword: {
            value: '',
            error: true,
          },
          repeatPassword: {
            value: '',
            error: true,
          },
        });
        setIsDisabled(true);
        if (e?.response) {
          dispatch(addAlert({ message: e?.response?.data?.message, type: 'error' }));
        }
      });
  };

  useEffect(() => {
    setState({
      ...state,
      currentPassword: {
        value: '',
        error: false,
      },
      newPassword: {
        value: '',
        error: false,
      },
      repeatPassword: {
        value: '',
        error: false,
      },
    });
  }, [active]);

  useEffect(() => {
    if (
      state.currentPassword.value.length > 0 &&
      state.newPassword.value.length > 0 &&
      state.repeatPassword.value.length > 0 &&
      state.newPassword.value === state.repeatPassword.value
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [state.currentPassword, state.newPassword, state.repeatPassword]);

  return (
    <ModalContainer active={active} setIsActive={setIsActive}>
      <div className={'change-password-modal'}>
        <div className={'change-data-container'}>
          <div className={'password-img-container'}>
            <img src={'/secureImage.svg'} alt={'change-password-logo'} />
          </div>
          <div className={'change-password-title'}>Change password</div>
          <div className={'change-container'}>
            <form className={'inputs-container'}>
              {inputs.map((input) => {
                return (
                  <InputLabelPassword
                    key={input.name}
                    id={input.id}
                    error={input.error}
                    isShow={input.vision}
                    value={input.value}
                    label={input.name}
                    setIsShow={() => input.setVision(!input.vision)}
                    onChange={input.handler}
                    size={'medium'}
                    style={{ width: '100%', maxWidth: '435px', minWidth: '435px', maxHeight: '56px', color: 'white' }}
                  />
                );
              })}
            </form>
            <LoadingBtnModal
              disabled={isDisabled}
              title={'change'}
              loading={false}
              onClick={() => changePassword(state.currentPassword.value, state.newPassword.value)}
            />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
