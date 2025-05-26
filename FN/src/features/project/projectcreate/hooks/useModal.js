// src/hooks/useModal.js
import { useState, useEffect } from 'react';

const useModal = () => {
  const [isVisible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // 예: 'tempSave', 'submit'

  const open = (type = null) => {
    setModalType(type);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setModalType(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isVisible, modalType, open, close };
};

export default useModal;
