import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import React, { useRef, useState } from 'react';

interface EditPersonalProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
}

export const EditPersonalModal: React.FC<EditPersonalProps> = ({ active, setIsActive }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const AvatarUploader = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarUrl, setAvatarUrl] = useState<string>('/editAvatar.svg'); // Состояние для URL аватара

    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarUrl(reader.result as string); // Устанавливаем загруженный файл как URL аватара
        };
        reader.readAsDataURL(file); // Читаем файл как Data URL для предпросмотра
        console.log('Selected file:', file);
      }
    };

    return (
      <div className="modal-avatar-container">
        <img
          style={{ height: '138px', width: '138px', borderRadius: '50%' }}
          src={avatarUrl}
          className="modal-avatar"
          alt="avatar"
        />
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
      key: 'input-name',
      id: 'input-name',
      name: 'Name',
    },
    {
      key: 'input-surname',
      id: 'input-surname',
      name: 'Surname',
    },
    {
      key: 'input-email',
      id: 'input-login',
      name: 'Login',
    },
  ];

  // const sendData = () => {
  //   if (file) {
  //
  //   }
  // }

  return (
    <>
      <ModalContainer key={'edit-personal-modal'} active={active} setIsActive={setIsActive}>
        <div key={'edit-personal'} className={'edit-personal-modal'}>
          <div key={'edit-personal-container'} className={'data-container'}>
            <div key={'edit-personal22'} className={'personal-title'}>
              Personal data
            </div>
            <AvatarUploader key={'edit-per2sonal'} />
            <div key={'edit-persona23l'} className={'info-container'}>
              <div key={'edit-per23sonal'} className={'inputs-container'}>
                {inputs.map((input) => {
                  return (
                    <InputLabelText
                      key={input.key}
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
              <LoadingBtnModal key={'edit-per23so23nal2'} title={'Save'} loading={false} />
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};
