import React from 'react';
import cx from 'classnames';
import styles from './TabNav.module.scss';

type TProps = {
  className?: string;
  containerClassName?: string;
};

const TabNav = ({
  className,
  containerClassName,
  children,
}: React.PropsWithChildren<TProps>) => (
  <div className={cx(styles.container, containerClassName)}>
    <div className={cx(styles['tabs-wrapper'], className)}>{children}</div>
  </div>
);

export default TabNav;
