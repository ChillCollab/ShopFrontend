import React, { useEffect, useState } from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { authLayout } from '../../../requests/layout.ts';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';

interface ChangeEmailProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
  setIsActiveSub: (active: boolean) => void;
  setNotify: (active: boolean) => void;
}

export const ChangeEmailModal: React.FC<ChangeEmailProps> = ({ active, setIsActive, setIsActiveSub, setNotify }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isErrText, setIsErrText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsEmail(e.target.value);
  };

  const sendEmail = async () => {
    setIsLoading(true);
    await authLayout(profileReqs.changeEmail(isEmail)).then((res: any) => {
      if (res?.response) {
        if (res?.response?.status !== 200) {
          setIsError(true);
          setIsErrText(res?.response?.data?.message);
        }
      } else {
        setNotify(true);
        setIsActive(false);
        setIsActiveSub(true);
        setIsLoading(false);
      }
    });
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
        <form className={'change-data-container'}>
          <img src={'/letterImage.svg'} alt={'change-password-logo'} />
          <div className={'email-text-container'}>
            <div className={'email-title'}>Enter your email address</div>
            <p className={'description-change-email'}>Enter a new email address</p>
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
            {isError ? <p style={{ display: 'flex', alignItems: 'center' }}>{isErrText}</p> : <></>}
            <LoadingBtnModal disabled={isDisabled} title={'send'} loading={isLoading} onClick={sendEmail} />
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};
