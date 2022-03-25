import React from 'react';
import cx from 'classnames';
import styles from './TabNav.module.scss';

type TProps = {
  tabKey: string;
  title: React.ReactNode;
  onSelect: (key: string) => void;
  active: boolean;
  disabled?: boolean;
  className?: string;
  activeClassName?: string;
  inverted?: boolean;
  titleWidth?: number;
};

const TabNavItem = ({
  tabKey,
  title,
  active,
  onSelect,
  disabled,
  inverted,
  className,
  activeClassName,
  titleWidth,
}: React.PropsWithChildren<TProps>) => (
  <div
    key={tabKey}
    className={cx(
      styles['tab-title'],
      active && cx(styles.active, activeClassName),
      disabled && styles.disabled,
      inverted && styles.inverted,
      className
    )}
    id={tabKey}
    style={{ width: titleWidth }}
    onClick={() => onSelect(tabKey)}
  >
    {title}
  </div>
);

export default TabNavItem;
