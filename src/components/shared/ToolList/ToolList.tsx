import * as React from 'react';
import cx from 'classnames';
import styles from './ToolList.module.scss';
import ToolListItem from './ToolListItem';

type ToolListProps = {
  className?: string;
};

const ToolList = ({
  className,
  children,
}: React.PropsWithChildren<ToolListProps>) => {
  return <div className={cx(styles.list, className)}>{children}</div>;
};

ToolList.Item = ToolListItem;
export default ToolList;
