import React, { useEffect, useState } from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import authLayout from '../../../requests/layout.ts';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';
import { useDispatch } from 'react-redux';
import { setError, setErrorMsg, setSuccess, setSuccessMsg } from '../../../store/systemAlertSlices.ts';

interface ChangePhoneprops {
  active: boolean;
  setIsActive: (active: boolean) => void;
}

export const ChangePhoneNumber: React.FC<ChangePhoneprops> = ({ active, setIsActive }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isNumber, setIsNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsNumber(e.target.value);
  };

  const changeNumber = (number: string) => {
    authLayout(profileReqs.changeNumber(number))
      .then((res: any) => {
        dispatch(setSuccessMsg({ isSuccessMsg: res.data.message }));
        dispatch(setSuccess({ isSuccess: true }));
        setIsActive(false);
        setIsLoading(false);
      })
      .catch((e: any) => {
        setIsError(true);
        dispatch(setError({ isError: true }));
        dispatch(setErrorMsg({ isErrorMsg: e?.response?.data?.message }));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isNumber.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isNumber]);

  return (
    <ModalContainer active={active} setIsActive={setIsActive}>
      <div className={'change-email-modal'}>
        <form className={'change-data-container'}>
          <div className={'img-phone-number'}>
            <img src={'/phoneLogo.svg'} alt={'change-password-logo'} />
          </div>
          <div className={'email-text-container'}>
            <div className={'email-title'}>Enter your phone number</div>
            <p className={'description-change-email'}>Enter a new phone number</p>
          </div>
          <div className={'change-container'}>
            <div className={'inputs-container'}>
              <InputLabelText
                id={'input-phone'}
                type={'phone'}
                onFocus={(e) => {
                  console.log(e);
                }}
                error={isError}
                label={'Phone'}
                onChange={handleNumber}
                onKeyDown={(e) => {
                  console.log(e);
                }}
                size={'medium'}
                style={{ width: '100%', maxWidth: '435px', minWidth: '435px', maxHeight: '56px', color: 'white' }}
              />
            </div>
            <LoadingBtnModal
              disabled={isDisabled}
              title={'save'}
              loading={isLoading}
              onClick={() => changeNumber(isNumber)}
            />
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};
