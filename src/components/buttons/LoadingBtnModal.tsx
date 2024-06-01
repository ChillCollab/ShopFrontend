import { LoadingButton } from '@mui/lab';
import './loadingBtnModal.scss';
import React, { useEffect } from 'react';

interface LoadingBtnModalProps {
  loading: boolean;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const LoadingBtnModal: React.FC<LoadingBtnModalProps> = ({ loading, title, disabled, onClick }) => {
  const [isClass, setIsClass] = React.useState('loading-btn-modal-disable');

  useEffect(() => {
    if (disabled) {
      setIsClass('loading-btn-modal-disable');
    } else {
      setIsClass('loading-btn-modal');
    }
  }, [disabled]);

  return (
    <LoadingButton
      disabled={disabled}
      size={'medium'}
      variant={'contained'}
      className={isClass}
      loading={loading}
      onClick={onClick}
    >
      {title}
    </LoadingButton>
  );
};
