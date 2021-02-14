import { useEffect } from "react";
import "./Toast.css";

const Toast = ({ toast, close }) => {
  useEffect(() => {
    if (!toast) return;

    const closeToast = () => {
      setTimeout(() => {
        close();
      }, 1500);
    };

    closeToast();

    return () => {
      clearTimeout(closeToast);
    };
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="toast">
      <div className="toast-content">{toast}</div>
    </div>
  );
};

export default Toast;
