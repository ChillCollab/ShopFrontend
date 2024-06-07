import React, { useEffect, useState } from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/systemAlertSlices.ts';

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
    setIsError(false);
    setIsNumber(e.target.value);
  };

  const validateNumber = (value: string): boolean => {
    const regex = /^[0-9]{1,32}$/;
    return regex.test(value);
  };

  const changeNumber = (number: string) => {
    setIsLoading(true);
    number = number.replace('+', '');
    if (validateNumber(number)) {
      profileReqs
        .changeNumber(number)
        .then((res: any) => {
          dispatch(addAlert({ message: res.data.message, type: 'success' }));
          setIsActive(false);
          setIsLoading(false);
        })
        .catch((e: any) => {
          setIsError(true);
          dispatch(addAlert({ message: e?.response?.data?.message, type: 'error' }));
          setIsLoading(false);
        });
    } else {
      setIsError(true);
      dispatch(
        addAlert({ message: 'Invalid phone number. Use only numbers and number of digits less than 32', type: 'error' })
      );
      setIsLoading(false);
    }
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
