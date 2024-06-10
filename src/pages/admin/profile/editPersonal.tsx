import { ModalContainer } from '../../../components/modals/ModalContainer.tsx';
import InputLabelText from '../../../components/inputs/InputLabelText.tsx';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal.tsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAlert } from '../../../store/systemAlertSlices.ts';
import { profileReqs } from '../../../requests/profile/profileReqs.ts';
import { storage } from '../../../storage/storage.ts';
import { setImage } from '../../../store/navbarSlices.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { isLogin } from '../../../store/userDataSlices.ts';
import authRequests from '../../auth/requests/auth.ts';

interface EditPersonalProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
}

export const EditPersonalModal: React.FC<EditPersonalProps> = ({ active, setIsActive }) => {
  // const [isUploading, setIsUploading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [errorLogin, setErrorLogin] = useState<boolean>(false);

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
            setAvatarUrl(reader.result as string);
            dispatch(setImage({ isImage: reader.result as string })); // Устанавливаем загруженный файл как URL аватара
          };
          reader.readAsDataURL(file);
          uploadFile(file);
        } else {
          dispatch(addAlert({ message: 'File size should be less 3 MB', type: 'error' }));
        }
      }
    };

    useEffect(() => {
      const user = localStorage.getItem(storage.userData);
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

  const handleName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
  };

  const handleSurname = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSurname(e.target.value);
  };

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLogin(e.target.value);
  };

  const updateData = (name: string, surname: string, login: string) => {
    profileReqs
      .changePersonalData(name, surname, login)
      .then((changeDataResponse: AxiosResponse) => {
        if (changeDataResponse.status === 200) {
          if (login) {
            dispatch(isLogin({ isLogin: login }));
          }
          authRequests.userInfo().then((res: AxiosResponse) => {
            if (res.status === 200) {
              localStorage.setItem(storage.userData, JSON.stringify(res.data));
            }
          });
          dispatch(addAlert({ message: 'Personal data has been changed', type: 'success' }));
          setIsActive(false);
        }
      })
      .catch((e: AxiosError<{ code: number; message: string }>) => {
        if (e?.response?.status === 500) {
          dispatch(addAlert({ message: 'Something went wrong', type: 'error' }));
          return;
        }
        if (e?.response?.data?.code === 24) {
          setErrorLogin(true);
        }
        if (e?.response) dispatch(addAlert({ message: e?.response?.data?.message, type: 'error' }));
      });
  };

  const inputs = [
    {
      key: 'input-name',
      id: 'input-name',
      name: 'Name',
      error: false,
      onChange: handleName,
    },
    {
      key: 'input-surname',
      id: 'input-surname',
      name: 'Surname',
      error: false,
      onChange: handleSurname,
    },
    {
      key: 'input-email',
      id: 'input-login',
      name: 'Login',
      error: errorLogin,
      onChange: handleLogin,
    },
  ];

  const uploadFile = (file: File) => {
    if (file) {
      profileReqs
        .uploadAvatar(file)
        .then((uploadResponse) => {
          if (uploadResponse.status === 200) {
            setIsActive(false);
            dispatch(addAlert({ message: uploadResponse?.data?.message, type: 'success' }));
          }
        })
        .catch((e) => {
          dispatch(addAlert({ message: e.response.data.message, type: 'error' }));
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
                      onChange={input.onChange}
                      error={input.error}
                      label={input.name}
                      type={'text'}
                      size={'medium'}
                    />
                  );
                })}
              </div>
              <LoadingBtnModal
                key={'edit-per23so23nal2'}
                title={'Save'}
                loading={false}
                onClick={() => {
                  updateData(name, surname, login);
                }}
              />
            </div>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};
