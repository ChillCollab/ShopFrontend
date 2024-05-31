import React, { useState } from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { useDispatch } from 'react-redux';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';
import { setError, setErrorMsg, setSuccess, setSuccessMsg } from '../../../store/systemAlertSlices.ts';

interface ChangeEmailSubmitProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
}

export const ChangeEmailSubmitModal: React.FC<ChangeEmailSubmitProps> = ({ active, setIsActive }) => {
  const [isCode, setIsCode] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleCode = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsError(false);
    setIsCode(Number(e.target.value));
  };

  const sendCode = async (code: number) => {
    setIsLoading(true);
    profileReqs
      .changeEmailSubmit(Number(code))
      .then((res: any) => {
        if (res) {
          if (res.status === 200) {
            dispatch(setSuccessMsg({ isSuccessMsg: res.data.messages }));
            dispatch(setSuccess({ isSuccess: true }));
            setIsActive(false);
            setIsLoading(false);
          }
        }
      })
      .catch((e: any) => {
        setIsError(true);
        dispatch(setErrorMsg({ isErrorMsg: e?.response?.message }));
        dispatch(setError({ isError: true }));
        setIsLoading(false);
      });
  };

  return (
    <ModalContainer active={active} setIsActive={setIsActive}>
      <div className={'change-email-submit-modal'}>
        <div className={'change-data-container'}>
          <div className={'send-image-container'}>
            <img src={'/letterSentImage.svg'} alt={'change-password-logo'} />
          </div>
          <div className={'email-text-container'}>
            <div className={'email-title'}>Code confirmation</div>
            <p className={'description-change-email'}>Enter the code that was sent to your email</p>
          </div>
          <div className={'change-container'}>
            <div className={'inputs-container'}>
              <InputLabelText
                id={'input-code'}
                type={'code'}
                onFocus={(e) => {
                  console.log(e);
                }}
                error={isError}
                label={'Code'}
                onChange={handleCode}
                onKeyDown={(e) => {
                  console.log(e);
                }}
                size={'medium'}
                style={{ width: '100%', maxWidth: '435px', minWidth: '435px', maxHeight: '56px', color: 'white' }}
              />
            </div>
            <div className={'submit-container'}>
              <LoadingBtnModal title={'submit'} loading={isLoading} onClick={() => sendCode(isCode)} />
              <div className={'repeat-container'}>
                <h1>Didn't receive the code?</h1>
                <p>Send again</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
