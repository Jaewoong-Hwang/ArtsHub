import React, { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal';

const StepModalContext = createContext();

export const StepModalProvider = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const open = (type) => {
    setModalType(type);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setModalType(null);
  };

  return (
    <StepModalContext.Provider value={{ isVisible, modalType, open, close }}>
      {children}
      {isVisible && <Modal type={modalType} onClose={close} />}
    </StepModalContext.Provider>
  );
};

export const useStepModal = () => useContext(StepModalContext);
