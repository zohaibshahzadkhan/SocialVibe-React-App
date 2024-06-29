import React, { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    ms: 0,
    message: '',
    classes: '',
    isVisible: false,
  });

  const showToast = useCallback((ms, message, classes) => {
    setToast({
      ms: parseInt(ms, 10),
      message,
      classes,
      isVisible: true,
    });

    setTimeout(() => {
      setToast(prev => ({
        ...prev,
      }));
    }, 10);

    setTimeout(() => {
      setToast(prev => ({
        ...prev,
      }));
    }, ms - 500);

    setTimeout(() => {
      setToast(prev => ({
        ...prev,
        isVisible: false,
      }));
    }, ms);
  }, []);

  const memoizedValue = React.useMemo(
    () => ({ toast, showToast }),
    [toast, showToast]
  );

  return (
    <ToastContext.Provider value={memoizedValue}>
      {children}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastProvider;
