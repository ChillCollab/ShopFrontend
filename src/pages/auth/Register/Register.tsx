import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from '@mui/material';
import { InputLabelMain } from '../../../components/inputs/Inputs.tsx';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import authRequests from '../requests/auth.ts';
import AlertSuccess from '../../../components/alerts/AlertSuccess/AlertSuccess.tsx';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';

const Register: React.FC = () => {
  const [error, setError] = useState('');
  const [alert, setAlert] = useState({
    isShow: false,
    message: '',
  });
  const {
    register: conf,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const configs = {
    ['Login']: {
      ...conf('login', {
        required: 'Поле логин не должно быть пустым',
        minLength: {
          value: 6,
          message: 'Поле логина должно быть больше 5',
        },
        maxLength: {
          value: 20,
          message: 'Поле логина должно быть меньше 20',
        },
      }),
    },
    ['Name']: {
      ...conf('name', {
        required: 'Имя поля не должно быть пустым',
        minLength: {
          value: 6,
          message: 'Имя поля должно быть больше 5',
        },
        maxLength: {
          value: 20,
          message: 'Имя поля должно быть меньше 20',
        },
      }),
    },
    ['Surname']: {
      ...conf('surname', {
        required: 'Поле фамилия не должно быть пустым',
        minLength: {
          value: 6,
          message: 'Поле фамилия должно быть больше 5',
        },
        maxLength: {
          value: 20,
          message: 'Поле фамилия должно быть меньше 20',
        },
      }),
    },
    ['Email']: {
      ...conf('email', {
        required: 'Поле электронной почты не должно быть пустым',
        minLength: {
          value: 6,
          message: 'Поле адрес электронной почты должно быть больше 5',
        },
        maxLength: {
          value: 100,
          message: 'Поле электронной почты должно быть меньше 100',
        },
      }),
    },
  };
  type FieldKey = keyof typeof configs;

  function registerAccount(login: string, name: string, surname: string, email: string) {
    authRequests
      .register(login, name, surname, email)
      .then((registerResponse) => {
        if (registerResponse?.status === 200) {
          if (!registerResponse?.data?.error) {
            authRequests
              .sendMail(email)
              .then((sendResponse) => {
                if (sendResponse?.status === 200) {
                  setAlert({
                    isShow: true,
                    message: sendResponse?.data.message,
                  });
                  const timer = setTimeout(() => {
                    setAlert({ ...alert, isShow: false });
                    clearTimeout(timer);
                  }, 5000);
                }
              })
              .catch((err) => {
                console.log(err);
                setError(err.message);
              });
          }
        }
        setAlert({
          message: registerResponse?.data?.message,
          isShow: true,
        });
        const timer = setTimeout(() => {
          setAlert({ message: alert.message, isShow: false });
          clearTimeout(timer);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  }

  const onHandleSubmit = (inputDatas) => {
    const { email, login, name, surname } = inputDatas;
    registerAccount(login, name, surname, email);
  };
  return (
    <div className="register">
      <AlertSuccess {...alert} />
      <div>
        <h1 className="title">Registration</h1>
        <form onSubmit={handleSubmit(onHandleSubmit)} style={{ width: '700px' }}>
          {Object.keys(configs).map((fieldName) => {
            return (
              <div className="register-field" key={fieldName}>
                <InputLabelMain
                  style={{ marginBottom: '10px', color: 'white' }}
                  error={!!errors?.email}
                  size="medium"
                  type={fieldName == 'email' ? 'email' : 'text'}
                  label={fieldName}
                  register={configs[fieldName as FieldKey]}
                />
                <div
                  style={{ marginTop: '10px', marginBottom: '20px', color: 'rgba(220, 20, 60, 1)', fontSize: '14px' }}
                >
                  <ErrorMessage errors={errors} name={fieldName} />
                </div>
              </div>
            );
          })}

          <Button
            sx={{
              marginTop: '10px',
              marginBottom: '50px',
              height: '60px',
              backgroundColor: 'rgba(139, 135, 214, 1)',
              color: 'white',
              '&: hover': {
                background: '#fff',
                color: '#8B87D6',
              },
            }}
            className="button"
            type="submit"
          >
            register
          </Button>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="registerBox" onClick={() => navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true })}>
          <p>Don have an account?</p>
          <div className="registerButton">Login</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
