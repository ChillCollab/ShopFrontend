import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './forgot.scss';

const SuccessfulSend: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <div className="inputContainer">
        <h1>Successfully send</h1>
        <div className="text">Email was sent! Please, check your email for submit your account!</div>
        <div className="buttonsContainer">
          <Button className="loginButton" onClick={() => navigate('/admin/login', { replace: true })}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulSend;
