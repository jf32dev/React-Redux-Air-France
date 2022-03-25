import * as React from 'react';
import cx from 'classnames';
import styles from './Nav.module.scss';

type NavItemProps = {
  onClick?: () => void;
  active?: boolean;
  className?: string;
};

const NavItem = ({
  children,
  onClick,
  active,
  className,
}: React.PropsWithChildren<NavItemProps>) => {
  return (
    <span className={cx(active && styles.active, className)} onClick={onClick}>
      {children}
    </span>
  );
};

NavItem.displayName = 'NavItem';
export default NavItem;
