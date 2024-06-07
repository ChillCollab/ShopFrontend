import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import authRequests from '../requests/auth';
import { routePaths } from '../../../config/configRoutes/configRoutes';
import { LoadingBtnModal } from '../../../components/buttons/LoadingBtnModal';
import { InputLabelMain } from '../../../components/inputs/Inputs.tsx';

// Определяем тип для данных формы
interface FormData {
  login: string;
  name: string;
  surname: string;
  email: string;
}

const Register: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<FormData>({
    login: '',
    name: '',
    surname: '',
    email: '',
  });

  const navigate = useNavigate();

  function registerAccount(login: string, name: string, surname: string, email: string) {
    setIsLoading(true);
    authRequests
      .register(login, name, surname, email)
      .then((registerResponse) => {
        if (registerResponse?.status === 200) {
          if (!registerResponse?.data?.error) {
            authRequests
              .sendMail(email)
              .then((sendResponse) => {
                if (sendResponse?.status === 200) {
                  navigate(routePaths.REGISTER_SUCCESSFUL, { replace: true });
                }
              })
              .catch((err) => {
                setError(err.message);
              });
          }
        }
        navigate(routePaths.REGISTER_SUCCESSFUL, { replace: true });
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setIsLoading(false);
  }

  const inputs = [
    {
      name: 'login',
      label: 'Login',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setState({ ...state, login: e.target.value }),
    },
    {
      name: 'name',
      label: 'Name',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setState({ ...state, name: e.target.value }),
    },
    {
      name: 'surname',
      label: 'Surname',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setState({ ...state, surname: e.target.value }),
    },
    {
      name: 'email',
      label: 'Email',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setState({ ...state, email: e.target.value }),
    },
  ];

  return (
    <div className={'registerContainer'}>
      <div className={'inputRegContainer'}>
        <h1>Registration</h1>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="inputs-container-reg">
            {inputs.map((fieldName) => {
              return (
                <InputLabelMain
                  error={false}
                  size="medium"
                  type="text"
                  label={fieldName.label}
                  onChange={fieldName.onChange}
                />
              );
            })}
          </div>
          {error && <div className="error">{error}</div>}

          <LoadingBtnModal
            loading={isLoading}
            title={'Register'}
            onClick={() => registerAccount(state.login, state.name, state.surname, state.email)}
          />
        </form>
        <div className="registerBox" onClick={() => navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true })}>
          <p>Don't have an account?</p>
          <div className="registerButton">Login</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
