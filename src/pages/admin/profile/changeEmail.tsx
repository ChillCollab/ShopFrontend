import React, { useEffect, useState } from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { authLayout } from '../../../requests/layout.ts';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';

interface ChangeEmailProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
  activeSub: boolean;
  setIsActiveSub: (active: boolean) => void;
}

export const ChangeEmailModal: React.FC<ChangeEmailProps> = ({ active, setIsActive, activeSub, setIsActiveSub }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsEmail(e.target.value);
  };

  const sendEmail = () => {
    setIsLoading(true);
    authLayout(profileReqs.changeEmail(isEmail))
      .then((res) => {
        if (res.status !== 200) {
          setIsError(true);
        }
        setIsActiveSub(true);
        setIsActive(false);
      })
      .catch((e) => {
        if (e.status !== 200) {
          setIsError(true);
        }
        setIsActiveSub(true);
        setIsActive(false);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    setIsEmail('');
  }, [active]);

  useEffect(() => {
    if (isEmail.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isEmail]);

  return (
    <ModalContainer active={active} setIsActive={setIsActive}>
      <div className={'change-email-modal'}>
        <div className={'change-data-container'}>
          <img src={'/letterImage.svg'} alt={'change-password-logo'} />
          <div className={'email-text-container'}>
            <div className={'email-title'}>Enter your email address</div>
            <text className={'description-change-email'}>Enter a new email address</text>
          </div>
          <div className={'change-container'}>
            <div className={'inputs-container'}>
              <InputLabelText
                id={'input-email'}
                type={'email'}
                onFocus={(e) => {
                  console.log(e);
                }}
                error={isError}
                label={'Email'}
                onChange={handleEmail}
                onKeyDown={(e) => {
                  console.log(e);
                }}
                size={'medium'}
                style={{ width: '100%', maxWidth: '435px', minWidth: '435px', maxHeight: '56px', color: 'white' }}
              />
            </div>
            <LoadingBtnModal disabled={isDisabled} title={'send'} loading={isLoading} onClick={() => sendEmail()} />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
