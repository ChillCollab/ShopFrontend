import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import React, { useRef } from 'react';

interface EditPersonalProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
}

export const EditPersonalModal: React.FC<EditPersonalProps> = ({ active, setIsActive }) => {
  const AvatarUploader = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        // Добавьте здесь обработку загруженного файла, например, загрузку на сервер или предпросмотр
        console.log('Selected file:', file);
      }
    };

    return (
      <div className="modal-avatar-container">
        <img src="/editAvatar.svg" className="modal-avatar" alt="no-avatar-edit-modal" />
        <img
          src="/changeAvatar.svg"
          className="modal-avatar-edit"
          alt="change-avatar-button"
          onClick={handleButtonClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
      </div>
    );
  };

  const inputs = [
    {
      id: 'input-name',
      name: 'Name',
    },
    {
      id: 'input-surname',
      name: 'Surname',
    },
    {
      id: 'input-login',
      name: 'Login',
    },
  ];

  return (
    <ModalContainer active={active} setIsActive={setIsActive}>
      <div className={'edit-personal-modal'}>
        <div className={'data-container'}>
          <div className={'personal-title'}>Personal data</div>
          <AvatarUploader />
          <div className={'info-container'}>
            <div className={'inputs-container'}>
              {inputs.map((input) => {
                return (
                  <InputLabelText
                    id={input.id}
                    onChange={(e) => console.log(e)}
                    error={false}
                    label={input.name}
                    type={'text'}
                    size={'medium'}
                    onKeyDown={(e) => console.log(e)}
                    onFocus={() => console.log()}
                    style={{ width: '100%', maxWidth: '435px', minWidth: '435px', maxHeight: '56px', color: 'white' }}
                  />
                );
              })}
            </div>
            <LoadingBtnModal title={'Save'} loading={false} />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
