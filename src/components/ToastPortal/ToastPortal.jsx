import styles from './styles.module.css';
import { useToastPortal } from '../../hooks';
import ReactDOM from 'react-dom';
import { Toast } from '../Toast';
import { uuid } from '../../shared';
import { useState, forwardRef, useEffect, useImperativeHandle, useCallback } from 'react';

export const ToastPortal = forwardRef(({ autoClose, autoCloseTime = 3000 }, ref) => {
  const [toasts, setToasts] = useState([]);
  const { loaded, portalId } = useToastPortal();

  useImperativeHandle(ref, () => ({
    addToast(toast) {
      setToasts([...toasts, { ...toast, id: uuid() }]);
    },
  }));

  const removeToast = useCallback(
    (id) => {
      setToasts(toasts.filter((t) => t.id !== id));
    },
    [setToasts, toasts]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (toasts.length) removeToast(toasts[toasts.length - 1].id);
    }, autoCloseTime);

    return () => clearTimeout(timeout);
  }, [removeToast, autoCloseTime, toasts]);

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
