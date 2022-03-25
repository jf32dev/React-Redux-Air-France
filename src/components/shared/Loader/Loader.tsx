import * as React from 'react';
import cx from 'classnames';
import styles from './Loader.module.scss';

type TLoader = {
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  className?: string;
  wrapperClassName?: string;
};

const Loader = ({ size = 'medium', className, wrapperClassName }: TLoader) => (
  <div className={cx(styles.loader, wrapperClassName)}>
    <div
      className={cx(styles.spinner, styles[size], styles.default, className)}
    />
  </div>
);

export default Loader;
