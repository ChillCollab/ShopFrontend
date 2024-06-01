import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';

const SuccessfulRegister: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <div className="inputContainer">
        <h1>Successfully register</h1>
        <div className="text">Email was sent! Please, check your email and follow the link to submit registration!</div>
        <div className="buttonsContainer">
          <Button className="loginButton" onClick={() => navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true })}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulRegister;
