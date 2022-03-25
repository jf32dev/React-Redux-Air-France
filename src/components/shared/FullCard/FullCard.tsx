import * as React from 'react';
import cx from 'classnames';
import styles from './FullCard.module.scss';
import { ReactComponent as Play } from '../../../assets/images/play.svg';
import { decodeEntities } from '../../../utils/htmlEntities';

interface FullCardProps {
  backgroundImage: string;
  className?: string;
  title: string;
  isVideo?: boolean;
  onClick?: () => void;
}
const FullCard = ({
  backgroundImage = 'https://images.unsplash.com/photo-1615372021685-b2dc6f9c2819?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1164&q=80',
  className,
  title,
  isVideo = false,
  onClick,
}: FullCardProps) => {
  return (
    <div
      className={cx(styles.fullcard, className)}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onClick={onClick}
    >
      <div className={styles.mask}>{isVideo && <Play />}</div>
      <div className={styles.content}>{decodeEntities(title)}</div>
    </div>
  );
};

export default FullCard;
