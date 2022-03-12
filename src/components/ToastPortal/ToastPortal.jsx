import styles from './styles.module.css';
import { useToastPortal } from '../../hooks';
import ReactDOM from 'react-dom';
import { useState, forwardRef, useRef } from 'react';
import { Toast } from '../Toast';
import { uuid } from '../../shared';
import { useImperativeHandle } from 'react';

export const ToastPortal = forwardRef(({ autoClose, autoCloseTime }, ref) => {
  const [toasts, setToasts] = useState([]);
  const { loaded, portalId } = useToastPortal();

  useImperativeHandle(ref, () => ({
    addToast(toast) {
      setToasts([...toasts, { ...toast, id: uuid() }]);
    },
  }));

  const removeToast = (id) => {
    setToasts(toasts.filter((t) => t.id !== id));
  };

  return loaded ? (
    ReactDOM.createPortal(
      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>,
      document.getElementById(portalId)
    )
  ) : (
    <></>
  );
});
