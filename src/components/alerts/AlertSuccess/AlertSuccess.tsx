import { Alert } from '@mui/material';
import './AlertSuccess.scss';
import { FC } from 'react';

type AlertPropType = {
  isShow: boolean;
  message: string;
};
const AlertSuccess: FC<AlertPropType> = ({ isShow, message }) => {
  if (!isShow || !message) return null;

  return (
    <>
      <div className={'back-alert'}>
        <div className="alert">
          <Alert severity="success">{message}</Alert>
        </div>
      </div>
    </>
  );
};

export default AlertSuccess;
