import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainSpinner } from '../../../components/spinners/MainSpinner.tsx';
import { LoadingButton } from '@mui/lab';
import { InputLabelPassword } from '../../../components/inputs/InputLabelPassword.tsx';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';
import authRequests, { RecoveryCodeCheck, SuccessInterface } from '../requests/auth.ts';
import { AxiosResponse } from 'axios';
import { storage } from '../../../storage/storage.ts';

interface State {
  isErr: boolean;
  isMsg: string;
  passwords: {
    password: string;
    confirmPassword: string;
  };
  visibility: {
    password: boolean;
    confirmPassword: boolean;
  };
  loading: {
    initial: boolean;
    button: boolean;
  };
}

type Field = 'password' | 'confirmPassword';

export default function ResetPassword() {
  const [state, setState] = useState<State>({
    isErr: false,
    isMsg: '',
    passwords: {
      password: '',
      confirmPassword: '',
    },
    visibility: {
      password: false,
      confirmPassword: false,
    },
    loading: {
      initial: true,
      button: false,
    },
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const code = id === undefined ? '' : id;

  const handleInputChange = (field: keyof State['passwords']) => (event: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      passwords: {
        ...prevState.passwords,
        [field]: event.target.value,
      },
    }));
  };

  const toggleVisibility = (field: keyof State['visibility']) => () => {
    setState((prevState) => ({
      ...prevState,
      visibility: {
        ...prevState.visibility,
        [field]: !prevState.visibility[field],
      },
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setState((prevState) => ({
        ...prevState,
        loading: {
          ...prevState.loading,
          button: true,
        },
      }));
    }
  };

  const handlePasswordSubmit = (code: string, pass: string) => {
    const { password, confirmPassword } = state.passwords;
    if (password !== confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        isErr: true,
        isMsg: 'Passwords do not match',
        loading: {
          ...prevState.loading,
          button: false,
        },
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      isErr: false,
      isMsg: '',
      loading: {
        ...prevState.loading,
        button: true,
      },
    }));
    sendPassword(code, pass);
  };

  const sendPassword = async (code: string, pass: string) => {
    console.log(10);
    authRequests.recoverySubmit(code, pass).then((response: AxiosResponse<SuccessInterface>) => {
      if (response.status === 200) {
        navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true });
      } else {
        setState((prevState) => ({
          ...prevState,
          isErr: true,
          isMsg: response.data.message,
          loading: {
            ...prevState.loading,
            button: false,
          },
        }));
      }
    });
  };

  useEffect(() => {
    const redirect = () => {
      localStorage.removeItem(storage.accessToken);
      localStorage.removeItem(storage.refreshToken);
      navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true });
    };

    if (code.length < 19) {
      redirect();
    }
    authRequests
      .recoveryCheckCode(code)
      .then((response: AxiosResponse<RecoveryCodeCheck | SuccessInterface>) => {
        if (response.status !== 200) {
          redirect();
        }
      })
      .catch(() => {
        redirect();
      });
    setState((prevState) => ({
      ...prevState,
      loading: {
        ...prevState.loading,
        initial: false,
      },
    }));
  }, [navigate, code]);

  return (
    <div className="loginContainer">
      {state.loading.initial ? (
        <MainSpinner isLoading={state.loading.initial} />
      ) : (
        <div className="inputContainer">
          <div className="titleContainer">
            <h1>Create a new password</h1>
            <p>
              Enter a new secure password. Your password must include at least one capital letter and one lowercase
              letter, one special character and a minimum length of 8 characters.
            </p>
          </div>
          {['password', 'confirmPassword'].map((field, index) => (
            <InputLabelPassword
              key={index}
              label={field === 'password' ? 'Password' : 'Confirm password'}
              isShow={state.visibility[field as Field]}
              setIsShow={toggleVisibility(field as Field)}
              error={state.isErr}
              onFocus={() => setState((prevState) => ({ ...prevState, isErr: false }))}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange(field as keyof State['passwords'])}
              size={'medium'}
            />
          ))}
          {state.isErr && <div style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>{state.isMsg}</div>}
          <div className="buttonsContainer">
            <LoadingButton
              loading={state.loading.button}
              className="loginButton"
              variant="contained"
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  loading: {
                    ...prevState.loading,
                    button: true,
                  },
                }));
                handlePasswordSubmit(code, state.passwords.password);
              }}
            >
              Confirm password
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
}
