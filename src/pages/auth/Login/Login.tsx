import './Login.scss';
import React from 'react';
import LoginForm from './LoginForm.tsx';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';

const Login: React.FC = () => {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">
          <h1>Welcome</h1>
          <p>Login now and access your account.</p>
        </div>
        <LoginForm />
        <Link to={routePaths.REGISTER_AUTH} className="login-question">
          <p>Don't have an account yet?</p>
          <div className="registerButton">Register</div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
