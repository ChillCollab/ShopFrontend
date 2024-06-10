import React, { ReactNode, useEffect, useState } from 'react';
import './modal.scss';

interface ModalProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
  children?: React.ReactNode;
}

interface ModalProps {
  active: boolean;
  setIsActive: (active: boolean) => void;
  children?: ReactNode;
  closeButton?: boolean;
}

export const ModalContainer: React.FC<ModalProps> = ({ active, setIsActive, children, closeButton }) => {
  const [childrenLoaded, setChildrenLoaded] = useState(false);
  if (closeButton === undefined) closeButton = true;

  useEffect(() => {
    // Устанавливаем childrenLoaded в true сразу после первой отрисовки children
    if (children) {
      setChildrenLoaded(true);
    }
  }, [children]);

  const handleBackdropClick = () => {
    setIsActive(false);
  };

  return active ? (
    <>
      {childrenLoaded ? (
        <>
          <div className="backdrop" onClick={handleBackdropClick} />
          <div className="modal-container">
            {closeButton ? (
              <img src="/close.svg" alt="close" className="close-modal" onClick={() => setIsActive(false)} />
            ) : null}
            {children}
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  ) : null;
};
