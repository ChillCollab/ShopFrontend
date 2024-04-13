import { Button } from '@mui/material';
import React from 'react';

interface SuccessfulSend {
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const SuccessfulSend: React.FC<SuccessfulSend> = ({ setRegisterSuccess, title }) => {
  return (
    <div className="inputContainer">
      <h1>{title}</h1>
      <div className="text">Email was sent! Please, check your email for submit your account!</div>
      <div className="buttonsContainer">
        <Button className="loginButton" onClick={() => setRegisterSuccess(false)}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default SuccessfulSend;
