import { Alert } from '@mui/material';
import './AlertBad.scss';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setError } from '../../../store/systemAlertSlices.ts';

const AlertBad: FC<any> = () => {
  const isShow = useSelector((state: RootState) => state.alert.isError);
  const message = useSelector((state: RootState) => state.alert.isErrorMsg);
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
      dispatch(setError({ isError: false }));
    }, 8000);
  }, [isShow]);

  if (!isVisible && !isExiting) return null;

  return (
    <div className={'back-alert'}>
      <div className={`alert ${isExiting ? 'alert-exit' : ''}`}>
        <Alert color="error" severity="error">
          {message}
        </Alert>
      </div>
    </div>
  );
};

export default AlertBad;
