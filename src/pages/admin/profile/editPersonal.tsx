import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setError, setErrorMsg, setSuccess, setSuccessMsg } from '../../../store/systemAlertSlices.ts';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';

interface EditPersonalProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
}

export const EditPersonalModal: React.FC<EditPersonalProps> = ({ active, setIsActive }) => {
  // const [isUploading, setIsUploading] = useState<boolean>(false);

  const dispatch = useDispatch();

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
        if (file.size <= 3000000) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAvatarUrl(reader.result as string); // Устанавливаем загруженный файл как URL аватара
          };
          reader.readAsDataURL(file);
          sendData(file);
        } else {
          dispatch(setErrorMsg({ isErrorMsg: 'File size should be less 3 MB' }));
          dispatch(setError({ isError: true }));
        }
      }
    };

    useEffect(() => {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        setAvatarUrl(userData.avatar_id);
      }
    }, []);

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
          onChange={async (event) => {
            handleFileChange(event);
          }}
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

  const sendData = (file: File) => {
    if (file) {
      profileReqs
        .uploadAvatar(file)
        .then((uploadResponse: any) => {
          if (uploadResponse.status === 200) {
            dispatch(setSuccessMsg({ isSuccessMsg: uploadResponse?.data?.message }));
            dispatch(setSuccess({ isSuccess: true }));
            setIsActive(false);
          }
        })
        .catch((e: any) => {
          dispatch(setErrorMsg({ isErrorMsg: e.response.data.message }));
          dispatch(setError({ isError: true }));
        });
    }
  };

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
              <LoadingBtnModal
                key={'edit-per23so23nal2'}
                title={'Save'}
                loading={false}
                onClick={() => {
                  console.log(1);
                }}
              />
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};
