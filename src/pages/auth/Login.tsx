import { Button } from '@mui/material';
import './auth.scss';
import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, SetStateAction, useState } from 'react';
import authRequests from './requests/auth.ts';
import { CCheckBox } from '../../components/checkBoxes/CheckBoxes.tsx';
import { InputLabelEmail, InputLabelPassword } from '../../components/inputs/Inputs.tsx';

interface Login {
  setRegister: React.Dispatch<SetStateAction<boolean>>;
  setIsForgot: React.Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<Login> = ({ setRegister, setIsForgot }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isEye, setIsEye] = useState(false);

  const handlerEmail = (data: ChangeEvent<HTMLInputElement>) => {
    setEmail(data.target.value);
    setIsErr(false);
  };

  const handlerPassword = (data: ChangeEvent<HTMLInputElement>) => {
    setPassword(data.target.value);
    setIsErr(false);
    console.log(password);
  };

  function logIn(login: string, password: string) {
    authRequests.login(login, password).then((loginResponse) => {
      if (loginResponse.status !== 200) {
        setErrMsg('Incorrect password or email');
        setIsErr(true);
      }
      localStorage.setItem('access_token', loginResponse.data.access_token);
      localStorage.setItem('refresh_token', loginResponse.data.refresh_token);

      navigate('/admin', { replace: false });
    });
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      logIn(email, password);
    }
  };

  return (
    <div className="inputContainer">
      <div className="titleContainer">
        <h1>Welcome</h1>
        <p>Log in now and access your account.</p>
      </div>
      <InputLabelEmail error={isErr} label={'Email'} size={'medium'} event={handlerEmail} onKeyDown={handleKeyDown} />
      <InputLabelPassword
        error={isErr}
        isShow={isEye}
        setIsShow={setIsEye}
        label={'Password'}
        event={handlerPassword}
        onKeyDown={handleKeyDown}
        size={'medium'}
      />
      {isErr ? <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{errMsg}</div> : <></>}
      <div className="forget">
        <div className="rememberContainer">
          <CCheckBox size="small" />
          <p>Remember me</p>
        </div>
        <div className="forgot-btn" onClick={() => setIsForgot(true)}>
          Forgot your password?
        </div>
      </div>
      <div className="buttonsContainer">
        <Button
          className="loginButton"
          variant="contained"
          onClick={() => {
            setIsErr(false);
            setErrMsg('');
            logIn(email, password);
          }}
          onKeyDown={handleKeyDown}
        >
          Login
        </Button>
      </div>
      <div className="registerBox" onClick={() => setRegister(true)}>
        <p>Do you haven't account?</p>
        <div className="registerButton">Register</div>
      </div>
    </div>
  );
};

export default Login;
