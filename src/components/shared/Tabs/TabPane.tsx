import React from 'react';
import cx from 'classnames';
import styles from './Tabs.module.scss';

type TProps<T> = {
  tabKey: T;
  title: React.ReactNode;
  navClassName?: string;
  activeNavClassName?: string;
  className?: string;
  onSeeMoreClick?: (key: T) => void;
  titleWidth?: number;
};

const TabPane = <T extends string>({
  tabKey,
  className,
  children,
}: React.PropsWithChildren<TProps<T>>) => (
  <div key={tabKey} className={cx(styles.pane, className)}>
    {children}
  </div>
);

export default TabPane;
