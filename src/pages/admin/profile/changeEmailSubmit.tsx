import React from 'react';
import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';

interface ChangeEmailSubmitProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
}

export const ChangeEmailSubmitModal: React.FC<ChangeEmailSubmitProps> = ({ active, setIsActive }) => {
  return (
    <ModalContainer active={active} setIsActive={setIsActive}>
      <div className={'change-email-submit-modal'}>
        <div className={'change-data-container'}>
          <img src={'/letterSentImage.svg'} alt={'change-password-logo'} />
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
                error={false}
                label={'Code'}
                onChange={(e) => {
                  console.log(e);
                }}
                onKeyDown={(e) => {
                  console.log(e);
                }}
                size={'medium'}
                style={{ width: '100%', maxWidth: '435px', minWidth: '435px', maxHeight: '56px', color: 'white' }}
              />
            </div>
            <div className={'submit-container'}>
              <LoadingBtnModal title={'submit'} loading={false} />
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
