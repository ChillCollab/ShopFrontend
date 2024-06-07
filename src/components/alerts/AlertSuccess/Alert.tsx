import './Alert.scss';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { removeAlert } from '../../../store/systemAlertSlices.ts';
import { Alert as MUIAlert } from '@mui/material';

const Alert: FC<any> = () => {
  const alerts = useSelector((state: RootState) => state.alert.alerts);
  const dispatch = useDispatch();
  const [activeTimers, setActiveTimers] = useState<Set<number>>(new Set());

  useEffect(() => {
    alerts.forEach((alert) => {
      if (!activeTimers.has(alert.id)) {
        const timer = setTimeout(() => {
          dispatch(removeAlert({ id: alert.id }));
          setActiveTimers((prev) => {
            const updated = new Set(prev);
            updated.delete(alert.id);
            return updated;
          });
        }, 8000);

        setActiveTimers((prev) => new Set(prev).add(alert.id));

        return () => clearTimeout(timer);
      }
    });
  }, [alerts, activeTimers, dispatch]);

  return (
    <div className="back-alert">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert`}>
          <MUIAlert color={alert.type === 'error' ? 'error' : 'success'} severity={alert.type}>
            {alert.message}
          </MUIAlert>
        </div>
      ))}
    </div>
  );
};

export default Alert;
