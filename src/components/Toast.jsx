import React from "react";
import { useToast } from "../context/ToastContext";

const Toast = () => {
  const { toast } = useToast();

  return (
    toast.isVisible && (
      <div
        className={`transition ease-in-out delay-500 duration-500 px-6 py-6 fixed top-full right-8 rounded-xl shadow-xl ${toast.classes}`}
      >
        {toast.message}
      </div>
    )
  );
};

export default Toast;
