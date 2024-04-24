import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authRequests from '../requests/auth';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { InputLabelPassword } from '../../../components/inputs/InputLabelPassword';
import { InputLabelMain } from '../../../components/inputs/Inputs';
import { CCheckBox } from '../../../components/checkBoxes/CheckBoxes.tsx';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';

const LoginForm = () => {
  const [isShow, setIsShow] = useState(false);
  const [hasServer, setHasServer] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onHandleSubmit(loginData: any) {
    authRequests
      .login(loginData)
      .then((loginResponse) => {
        localStorage.setItem('access_token', loginResponse.data.access_token);
        localStorage.setItem('refresh_token', loginResponse.data.refresh_token);
        if (loginResponse.status === 200) {
          navigate('/admin', { replace: false });
          setHasServer(true);
        } else setHasServer(false);
      })
      .catch(() => {
        setHasServer(false);
      });
  }
  const configLogin = {
    ...register('login', {
      required: 'Поле не заполнено',
      minLength: {
        value: 5,
        message: 'Поле должно быть не менее 5 символов',
      },
      maxLength: {
        value: 50,
        message: 'Поле должно быть не более 20 символов',
      },
    }),
  };
  const configPassword = {
    ...register('password', {
      required: 'Поле пароля должно быть больше 5',
      minLength: {
        value: 5,
        message: 'Поле пароля должно быть больше 5',
      },
      maxLength: {
        value: 20,
        message: 'Поле пароля должно быть меньше 20',
      },
    }),
  };

  const toggleShowPassword = () => setIsShow((prev) => !prev);
  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '700px' }}
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      <div>
        <InputLabelMain
          type="text"
          style={{
            marginBottom: '10px',
            color: 'white',
          }}
          error={!!errors?.login || !hasServer}
          size="medium"
          label="Login or Email"
          register={configLogin}
        />
        <div style={{ marginBottom: '20px', color: '#DC143C', fontSize: '14px' }}>
          <ErrorMessage errors={errors} name="login" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <InputLabelPassword
          error={!!errors?.password || !hasServer}
          size="medium"
          isShow={isShow}
          setIsShow={toggleShowPassword}
          label="Password"
          style={{ width: '100%', marginBottom: '10px', display: 'flex', color: 'white' }}
          register={configPassword}
        />
        <div style={{ color: '#DC143C', fontSize: '14px' }}>
          <ErrorMessage errors={errors} name="password" />
        </div>
      </div>

      {!hasServer && (
        <div style={{ color: '#DC143C', fontSize: '14px', marginTop: '20px', marginBottom: '25px' }}>
          <div>Incorrect login or password</div>
        </div>
      )}
      <div className="forget">
        <div className="rememberContainer">
          <CCheckBox size="small" />
          <p>Remember me</p>
        </div>
        <Link to={routePaths.FORGOT_PASSWORD} className="forgot-btn">
          Forgot your password?
        </Link>
      </div>
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
        className="submit-button"
        type="submit"
      >
        login
      </Button>
    </form>
  );
};

export default LoginForm;
