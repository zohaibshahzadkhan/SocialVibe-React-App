import React from 'react';
import { useToast } from '../context/ToastContext';

function Toast() {
  const { toast } = useToast();

  return (
    toast.isVisible && (
      <div
        className={`transition ease-in-out delay-500 duration-500 px-6 py-4 mb-6 rounded-xl shadow-xl z-50 ${toast.classes}`}
      >
        {toast.message}
      </div>
    )
  );
}

export default Toast;
