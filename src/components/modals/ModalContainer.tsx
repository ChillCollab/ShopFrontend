import React from 'react';
import './modal.scss';

interface ModalProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
  children?: React.ReactNode;
}

export const ModalContainer: React.FC<ModalProps> = ({ active, setIsActive, children }) => {
  const handleBackdropClick = () => {
    setIsActive(false);
  };

  return active ? (
    <>
      <div className={'backdrop'} onClick={handleBackdropClick} />
      <div className={'modal-container'}>
        <img src={'/close.svg'} alt={'close'} className={'close-modal'} onClick={() => setIsActive(!active)} />
        {children}
      </div>
    </>
  ) : (
    <></>
  );
};
