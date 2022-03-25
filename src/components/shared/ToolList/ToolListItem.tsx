import * as React from 'react';
import cx from 'classnames';
import styles from './ToolList.module.scss';

type ToolListItemProps = {
  title: string;
  icon: string;
  link: string;
  className?: string;
};

const ToolListItem = ({ title, icon, link, className }: ToolListItemProps) => {
  return (
    <a
      className={cx(styles.item, className)}
      href={link}
      rel="noreferrer"
      target="_blank"
    >
      <img alt="" src={icon} />
      <span>{title}</span>
    </a>
  );
};

export default ToolListItem;
