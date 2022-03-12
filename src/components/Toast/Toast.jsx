import styles from './styles.module.css';
import clsx from 'clsx';
import { useMemo } from 'react';

export const Toast = ({ mode, onClose, message }) => {
  const classes = useMemo(
    () =>
      clsx({
        [styles.toast]: true,
        [styles[mode]]: true,
      }),
    [mode]
  );

  return (
    <div onClick={onClose} className={classes}>
      <div className={classes.message}>{message}</div>
    </div>
  );
};
