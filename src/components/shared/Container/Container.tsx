import * as React from 'react';
import cx from 'classnames';
import styles from './Container.module.scss';

interface TProps {
  className?: string;
}

const Container: React.FC<TProps> = ({ children, className }) => (
  <div className={cx(styles.container, className)}>{children}</div>
);

export default Container;
