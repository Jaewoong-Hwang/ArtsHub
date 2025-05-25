
import { useState, useEffect } from 'react';

const useModal = () => {
  const [isVisible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isVisible, open, close };
};

export default useModal;