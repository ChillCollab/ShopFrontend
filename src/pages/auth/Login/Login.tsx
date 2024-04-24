import './Login.scss';
import React from 'react';
import LoginForm from './LoginForm.tsx';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">
          <h1>Welcome</h1>
          <p>Login now and access your account.</p>
        </div>
        <LoginForm />
        <div
          className="login-question"
          onClick={() => {
            navigate(routePaths.REGISTER_AUTH, { replace: false });
          }}
        >
          <p>Don't have an account yet?</p>
          <div className="registerButton">Register</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
