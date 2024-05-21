import React, { useEffect, useState } from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import { InputLabelPassword } from '../../../components/inputs/InputLabelPassword.tsx';

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
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      currentPassword: e.target.value,
    });
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      newPassword: e.target.value,
    });
  };
  const handleRepeatPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      repeatPassword: e.target.value,
    });
  };

  const inputs = [
    {
      id: 'current-password',
      name: 'Current password',
      vision: isShowOld,
      setVision: setIsShowOld,
      handler: handleOldPassword,
    },
    {
      id: 'new-password',
      name: 'Password',
      vision: isShow,
      setVision: setIsShow,
      handler: handlePassword,
    },
    {
      id: 'repeat-password',
      name: 'Repeat password',
      vision: isShowRepeat,
      setVision: setIsShowRepeat,
      handler: handleRepeatPassword,
    },
  ];

  useEffect(() => {
    setState({ ...state, currentPassword: '', newPassword: '', repeatPassword: '' });
  }, [active, state]);

  useEffect(() => {
    if (
      state.currentPassword.length > 0 &&
      state.newPassword.length > 0 &&
      state.repeatPassword.length > 0 &&
      state.newPassword === state.repeatPassword
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
          <img src={'/secureImage.svg'} alt={'change-password-logo'} />
          <div className={'change-password-title'}>Change password</div>
          <div className={'change-container'}>
            <div className={'inputs-container'}>
              {inputs.map((input) => {
                return (
                  <InputLabelPassword
                    error={false}
                    isShow={input.vision}
                    label={input.name}
                    setIsShow={() => input.setVision(!input.vision)}
                    onChange={input.handler}
                    onKeyDown={(e) => {
                      console.log(e);
                    }}
                    size={'medium'}
                    style={{ width: '100%', maxWidth: '435px', minWidth: '435px', maxHeight: '56px', color: 'white' }}
                  />
                );
              })}
            </div>
            <LoadingBtnModal disabled={isDisabled} title={'change'} loading={false} />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
