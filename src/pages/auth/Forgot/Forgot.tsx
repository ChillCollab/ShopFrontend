import React, { ChangeEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import authRequests from '../requests/auth.ts';
import InputLabelEmail from '../../../components/inputs/InputLabelEmail.tsx';
import { Link, useNavigate } from 'react-router-dom';
import './forgot.scss';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';

const Forgot: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<string>('');
  const [isErrMsg, setIsErrMsg] = useState<string>('');
  const [isErr, setIsErr] = useState<boolean>(false);

  const naviagate = useNavigate();

  const handlerEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setIsErr(false);
    setIsEmail(event.target.value);
  };
  const recovery = (email: string) => {
    setIsLoading(true);
    if (isEmail === '') {
      setIsErrMsg("Email can't be empty");
      setIsErr(true);
      setIsLoading(false);
      return;
    }
    authRequests
      .recovery(email)
      .then((recoveryResponse) => {
        if (recoveryResponse.status === 200) {
          naviagate(routePaths.FORGOT_PASSWORD_SUCCESS, { replace: true });
          setIsLoading(false);
        }
      })
      .catch((e) => {
        if (e.response) {
          if (e.response.data?.code === 2) {
            setIsErrMsg('Invalid email format');
            setIsErr(true);
            setIsLoading(false);
            return;
          } else if (e.response?.data?.code === 11) {
            setIsErrMsg(`Email already sent to mail ${isEmail}`);
            setIsErr(true);
            setIsLoading(false);
            return;
          }
        }
      });
  };

  return (
    <div className="loginContainer">
      <div className="inputContainer">
        <div className="titleContainer">
          <h1>Recovery the password</h1>
          <p>Enter your authorized email address to receive a password reset link.</p>
        </div>
        <InputLabelEmail error={isErr} label={'Email'} size={'medium'} onChange={handlerEmail} />
        {isErr ? <div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>{isErrMsg}</div> : <></>}
        <div className="buttonsContainer">
          <LoadingButton
            className="loginButton"
            variant="contained"
            loading={isLoading}
            onClick={() => recovery(isEmail)}
          >
            Send email
          </LoadingButton>
        </div>
        <Link to={routePaths.ADMIN_AUTH_LOGIN} className="registerBox">
          <p>Do you have an account yet?</p>
          <div className="registerButton">Login</div>
        </Link>
      </div>
    </div>
  );
};

export default Forgot;
