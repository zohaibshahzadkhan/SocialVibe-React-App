import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    ms: 0,
    message: '',
    classes: '',
    isVisible: false,
  });

  const showToast = useCallback((ms, message, classes) => {
    setToast({
      ms: parseInt(ms),
      message,
      classes,
      isVisible: true,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        classes: prev.classes + ' -translate-y-28',
      }));
    }, 10);

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        classes: prev.classes.replace('-translate-y-28', ''),
      }));
    }, ms - 500);

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        isVisible: false,
      }));
    }, ms);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
