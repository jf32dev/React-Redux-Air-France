import dayjs from 'dayjs';
import * as React from 'react';
import cx from 'classnames';
import { Story } from '../../../services/bridge/type/entities';
import styles from './Card.module.scss';
import defaultImage from '../../../assets/images/air-france.png';
import { decodeEntities } from '../../../utils/htmlEntities';
import { DATE_FORMAT } from '../../../constants/day';

interface CardProps {
  className?: string;
  onClick?: () => void;
  small?: boolean;
}
const Card = ({
  className,
  createDate,
  title,
  thumbnail,
  initialCreateDate,
  small,
  onClick,
}: CardProps &
  Pick<
    Story,
    'title' | 'createDate' | 'featuredImage' | 'thumbnail' | 'initialCreateDate'
  >) => {
  return (
    <div
      className={cx(styles.card, small && styles.small, className)}
      onClick={onClick}
    >
      <div className={styles.thumbnail}>
        <img
          alt={title}
          src={thumbnail}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
      </div>
      <div className={styles.detail}>
        <span className={styles.date}>
          {dayjs.unix(createDate).format(DATE_FORMAT)}
        </span>
        <span className={cx(styles.title, small && styles.small)}>
          {decodeEntities(title)}
        </span>
      </div>
    </div>
  );
};

export default Card;
