/* eslint-disable jsx-a11y/interactive-supports-focus */
import * as React from 'react';
import cx from 'classnames';
import styles from './ButtonCard.module.scss';
import { decodeEntities } from '../../../utils/htmlEntities';

interface ButtonCardProps {
  className?: string;
  thumbnail: string;
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}
const ButtonCard = ({
  className,
  thumbnail,
  title,
  disabled = false,
  onClick,
}: ButtonCardProps) => {
  return (
    <div
      className={cx(styles.card, disabled && styles.disabled, className)}
      role="button"
      {...(!disabled && { onClick })}
    >
      <img alt="" src={thumbnail} />
      <div className={styles.title}>{decodeEntities(title)}</div>
    </div>
  );
};

export default ButtonCard;
