import { Alert } from '@mui/material';
import './AlertSuccess.scss';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setSuccess } from '../../../store/systemAlertSlices.ts';

const AlertSuccess: FC<any> = () => {
  const isShow = useSelector((state: RootState) => state.alert.isSuccess);
  const message = useSelector((state: RootState) => state.alert.isSuccessMsg);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(isShow);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isShow) {
      setIsVisible(true);
      setIsExiting(false);
    } else if (isVisible) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
      }, 300); // Длительность анимации совпадает с CSS

      return () => clearTimeout(timer);
    }
  }, [isShow]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setSuccess({ isSuccess: false }));
    }, 8000);
  }, [isShow]);

  if (!isVisible && !isExiting) return null;

  return (
    <div className={'back-alert'}>
      <div className={`alert ${isExiting ? 'alert-exit' : ''}`}>
        <Alert severity="success">{message}</Alert>
      </div>
    </div>
  );
};

export default AlertSuccess;
