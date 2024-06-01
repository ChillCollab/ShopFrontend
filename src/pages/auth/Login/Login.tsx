import './login.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';
import { InputLabelMain } from '../../../components/inputs/Inputs.tsx';
import { InputLabelPassword } from '../../../components/inputs/InputLabelPassword.tsx';
import { CCheckBox } from '../../../components/checkBoxes/CheckBoxes.tsx';
import { LoadingButton } from '@mui/lab';
import authRequests, { SuccessInterface } from '../requests/auth.ts';
import { AxiosError } from 'axios';
import { MainSpinner } from '../../../components/spinners/MainSpinner.tsx';
import { storage } from '../../../storage/storage.ts';

interface State {
  isErr: boolean;
  isMsg: string;
  isEmail: {
    value: string;
    isValid: boolean;
  };
  isPassword: {
    value: string;
    isValid: boolean;
  };
  visibility: boolean;
  loading: {
    page: boolean;
    button: boolean;
  };
}

const Login: React.FC = () => {
  const [state, setState] = useState<State>({
    isErr: false,
    isMsg: '',
    isEmail: {
      value: '',
      isValid: false,
    },
    isPassword: {
      value: '',
      isValid: false,
    },
    visibility: false,
    loading: {
      page: true,
      button: false,
    },
  });

  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setState((prevState) => ({
        ...prevState,
        loading: {
          ...prevState.loading,
          button: true,
        },
      }));
      loginHandler();
    }
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, isPassword: { ...state.isPassword, value: event.target.value } });
  };

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, isEmail: { ...state.isEmail, value: event.target.value } });
  };

  const validateInputs = (email: string, password: string) => {
    if (email.trim() === '') {
      return { isValid: false, message: "Email can't be empty" };
    }
    if (password.trim() === '') {
      return { isValid: false, message: "Password can't be empty" };
    }
    return { isValid: true, message: '' };
  };

  // Определите типы для кодов ошибок
  type ErrorCode = 1 | 2 | 3 | 5 | 502 | 500;

  // Объявите объект с сообщениями об ошибках
  const errorMessages: Record<ErrorCode, string> = {
    1: 'Invalid email or password',
    2: 'Invalid email format',
    3: 'Invalid password',
    5: 'User is not active',
    502: 'Parsing error',
    500: 'Internal server error',
  };

  // Обработка ошибок
  const handleLoginError = (e: AxiosError<SuccessInterface>) => {
    const status = e.response?.status;
    const code = e.response?.data?.code as ErrorCode | undefined; // Уточнение типа для code
    console.log(code);

    // Определите сообщение об ошибке
    const message =
      code && errorMessages[code]
        ? errorMessages[code]
        : status === 500
          ? errorMessages[500]
          : 'An unexpected error occurred';

    setState({
      ...state,
      isErr: true,
      isMsg: message,
      loading: { page: false, button: false },
    });
  };

  const loginHandler = () => {
    const { isValid, message } = validateInputs(state.isEmail.value, state.isPassword.value);
    if (!isValid) {
      setState({ ...state, isErr: true, isMsg: message, loading: { page: false, button: false } });
      return;
    }
    setState({ ...state, loading: { page: false, button: true } });
    const authReq = authRequests.login(state.isEmail.value, state.isPassword.value);
    authReq()
      .then((loginResponse) => {
        if (loginResponse.status === 200) {
          localStorage.setItem(storage.accessToken, loginResponse.data.access_token);
          localStorage.setItem(storage.refreshToken, loginResponse.data.refresh_token);
          const path = loginResponse.data.role <= 0 ? routePaths.HOME : routePaths.ADMIN;
          navigate(path, { replace: true });
          setState({ ...state, loading: { page: false, button: false } });
        }
      })
      .catch((e) => {
        handleLoginError(e);
      });
  };

  useEffect(() => {
    const access = localStorage.getItem(storage.accessToken);
    const refresh = localStorage.getItem(storage.refreshToken);
    if (access !== null || refresh !== null) {
      const info = authRequests.userInfo();
      info()
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              const refresh = authRequests.refreshToken();
              refresh().then((refreshResponse) => {
                if (refreshResponse.status !== 200) {
                  localStorage.removeItem(storage.accessToken);
                  localStorage.removeItem(storage.refreshToken);
                } else {
                  localStorage.setItem(storage.accessToken, refreshResponse.data.access_token);
                  localStorage.setItem(storage.refreshToken, refreshResponse.data.refresh_token);
                  if (res.data?.role <= 0) {
                    navigate(routePaths.HOME, { replace: true });
                  } else {
                    navigate(routePaths.ADMIN, { replace: true });
                  }
                }
              });
            }
          } else {
            if (res.data.role <= 0) {
              navigate(routePaths.HOME, { replace: true });
            } else {
              navigate(routePaths.ADMIN, { replace: true });
            }
          }
        })
        .then(() => {
          setState({ ...state, loading: { page: false, button: false } });
        });
    } else {
      setState({ ...state, loading: { page: false, button: false } });
    }
  }, [navigate]);

  return state.loading.page ? (
    <MainSpinner isLoading={state.loading.page} />
  ) : (
    <div className="loginContainer">
      <div className="inputContainer">
        <div className="login-title">
          <h1>Welcome</h1>
          <p>Login now and access your account.</p>
        </div>
        <InputLabelMain
          type="text"
          error={state.isErr}
          size="medium"
          label="Login or Email"
          onChange={emailHandler}
          onKeyDown={handleKeyDown}
        />
        <InputLabelPassword
          key={'password'}
          label={'Password'}
          isShow={state.visibility}
          setIsShow={() => {
            setState({ ...state, visibility: !state.visibility });
          }}
          error={state.isErr}
          onKeyDown={handleKeyDown}
          size={'medium'}
          onChange={passwordHandler}
        />
        {state.isErr ? (
          <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{state.isMsg}</div>
        ) : null}
        <div className="forget">
          <div className="rememberContainer">
            <CCheckBox size="small" />
            <p>Remember me</p>
          </div>
          <Link to={routePaths.FORGOT_PASSWORD} className="forgot-btn">
            Forgot your password?
          </Link>
        </div>
        <div className="">
          <div className="buttonsContainer">
            <LoadingButton
              className="loginButton"
              variant={'contained'}
              loading={state.loading.button}
              onClick={loginHandler}
            >
              LOGIN
            </LoadingButton>
          </div>
        </div>
        <Link to={routePaths.REGISTER_AUTH} className="registerBox">
          <p>Don't have an account yet?</p>
          <div className="registerButton">Register</div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
