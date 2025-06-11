
import { useEffect, useRef, useState } from 'react';

const useScrollFadeIn = (delay = 0) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const style = {
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  };

  return [ref, visible, style];
};

export default useScrollFadeIn;
