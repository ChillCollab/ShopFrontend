import { InputLabelMain } from '../../../components/inputs/Inputs.tsx';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { MainSpinner } from '../../../components/spinners/MainSpinner.tsx';
import authRequests, { SuccessInterface, User } from '../requests/auth.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { LoadingButton } from '@mui/lab';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';
import { InputLabelPassword } from '../../../components/inputs/InputLabelPassword.tsx';
import { storage } from '../../../storage/storage.ts';

export default function SubmitRegistration() {
  const [isErr, setIsErr] = useState<boolean>(false);
  const [isMsg, setIsMsg] = useState<string>('');
  const [isEyeFirst, setIsEyeFirst] = useState<boolean>(false);
  const [isEyeSecond, setIsEyeSecond] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<string>('');
  const [isPasswordSubmit, setIsPasswordSubmit] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isName, setIsName] = useState<string>('');
  const [isSurname, setIsSurname] = useState<string>('');
  const [isEmail, setIsEmail] = useState<string>('');

  const navigate = useNavigate();
  const { id } = useParams();
  const code = id == undefined ? '' : id;

  const handlerPassword = (data: ChangeEvent<HTMLInputElement>) => {
    setIsPassword(data.target.value);
  };
  const handlerPasswordSubmit = (data: ChangeEvent<HTMLInputElement>) => {
    setIsPasswordSubmit(data.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsButtonLoading(true);
      activate(code, isPassword, isPasswordSubmit);
    }
  };

  const activate = (code: string, password: string, repeatPassword: string) => {
    if (password === repeatPassword) {
      authRequests
        .registerSubmit(code, password)
        .then((submitRegister: AxiosResponse<SuccessInterface>) => {
          if (submitRegister.data.success) {
            navigate(routePaths.REGISTER_SUCCESSFUL, { replace: true });
            setIsButtonLoading(false);
          }
        })
        .catch((error: AxiosError<SuccessInterface>) => {
          if (error.response?.status === 403 || error?.response?.status === 400) {
            if (error.response?.data?.code === 13) {
              setIsMsg('Password should be include Digits and Symbols');
              setIsErr(true);
            }
            if (error.response?.data?.code === 8) {
              setIsMsg("Password can't be empty");
              setIsErr(true);
            }
            setIsButtonLoading(false);
          } else {
            setIsMsg('Unexpected error!');
            setIsErr(true);
            setIsButtonLoading(false);
          }
        });
    } else {
      setIsErr(true);
      setIsButtonLoading(false);
    }
  };

  useEffect(() => {
    if (code.length < 19) {
      localStorage.removeItem(storage.accessToken);
      localStorage.removeItem(storage.refreshToken);
      localStorage.removeItem(storage.userData);
      navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true });
    } else {
      authRequests
        .registerCodeCheck(code)
        .then((checkResponse: AxiosResponse<User>) => {
          if (checkResponse.status === 200) {
            setIsName(checkResponse.data.name);
            setIsSurname(checkResponse.data.surname);
            setIsEmail(checkResponse.data.email);
            setIsLoading(false);
          } else {
            localStorage.removeItem(storage.accessToken);
            localStorage.removeItem(storage.refreshToken);
            localStorage.removeItem(storage.userData);
            setIsLoading(false);
            navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true });
          }
        })
        .catch((e: AxiosError) => {
          console.error(e);
          localStorage.removeItem(storage.accessToken);
          localStorage.removeItem(storage.refreshToken);
          localStorage.removeItem(storage.userData);
          navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true });
          setIsLoading(false);
        });
    }
  });

  return (
    <div className="loginContainer">
      {isLoading ? (
        <MainSpinner isLoading={isLoading} />
      ) : (
        <div className="inputContainer">
          <div className="titleContainer">
            <h1>Confirmation of registration</h1>
          </div>
          <InputLabelMain disabled={true} itemID={'name'} type={'text'} label={'Name'} size={'medium'} value={isName} />
          <InputLabelMain
            disabled={true}
            itemID={'surname'}
            type={'text'}
            label={'Surname'}
            size={'medium'}
            value={isSurname}
          />
          <InputLabelMain
            disabled={true}
            itemID={'email'}
            type={'email'}
            label={'Email'}
            size={'medium'}
            value={isEmail}
          />
          <InputLabelPassword
            error={isErr}
            isShow={isEyeFirst}
            setIsShow={() => setIsEyeFirst(!isEyeFirst)}
            label={'Password'}
            onFocus={() => setIsErr(false)}
            onKeyDown={handleKeyDown}
            onChange={handlerPassword}
            size={'medium'}
          />
          <InputLabelPassword
            error={isErr}
            isShow={isEyeSecond}
            setIsShow={() => setIsEyeSecond(!isEyeSecond)}
            label={'Password'}
            onFocus={() => setIsErr(false)}
            onChange={handlerPasswordSubmit}
            onKeyDown={handleKeyDown}
            size={'medium'}
          />
          {isErr ? <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{isMsg}</div> : <></>}
          <div className="buttonsContainer">
            <LoadingButton
              loading={isButtonLoading}
              className="loginButton"
              variant="contained"
              onClick={() => {
                setIsButtonLoading(true);
                activate(code, isPassword, isPasswordSubmit);
              }}
            >
              Register
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
}
