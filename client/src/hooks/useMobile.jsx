import React, { useEffect, useState } from 'react';

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  const handleResize = () => {
    const checkPoint = window.innerWidth < breakpoint;
    setIsMobile(checkPoint);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [isMobile];
};

export default useMobile;
