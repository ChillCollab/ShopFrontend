import React, { useEffect, useState } from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { authLayout } from '../../../requests/layout.ts';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';
import { useDispatch } from 'react-redux';
import { setError, setErrorMsg, setSuccess, setSuccessMsg } from '../../../store/systemAlertSlices.ts';

interface ChangeEmailProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
  setIsActiveSub: (active: boolean) => void;
}

export const ChangeEmailModal: React.FC<ChangeEmailProps> = ({ active, setIsActive, setIsActiveSub }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsEmail(e.target.value);
  };

  const sendEmail = async () => {
    setIsLoading(true);
    // await authLayout(profileReqs.changeEmail(isEmail))
    //   .then((res: any) => {
    //     if (res?.response) {
    //       if (res?.response?.status !== 200) {
    //         dispatch(setError({ isError: true }));
    //         dispatch(setErrorMsg({ isErrorMsg: res.response.data.message }));
    //         setIsLoading(false);
    //       }
    //     } else {
    //       dispatch(setSuccessMsg({ isSuccessMsg: 'An email with a confirmation code has been sent to your email.' }));
    //       dispatch(setSuccess({ isSuccess: true }));
    //       setIsActive(false);
    //       setIsActiveSub(true);
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((e: any) => {
    //     setIsError(true);
    //     dispatch(setError({ isError: true }));
    //     dispatch(setErrorMsg({ isErrorMsg: e?.response?.message }));
    //     setIsLoading(false);
    //   });
  };

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
          <div className={'imgContainer'}>
            <img src={'/letterImage.svg'} alt={'change-password-logo'} />
          </div>
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
            <LoadingBtnModal disabled={isDisabled} title={'send'} loading={isLoading} onClick={sendEmail} />
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};
