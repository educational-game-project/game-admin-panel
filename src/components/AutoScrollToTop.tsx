import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AutoScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null; // This component doesn't render anything in the DOM.
};

export default AutoScrollToTop;
