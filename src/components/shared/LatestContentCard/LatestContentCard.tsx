import * as React from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import styles from './LatestContentCard.module.scss';
import { ReactComponent as IconLike } from '../../../assets/icons/like.svg';
import { ReactComponent as IconComment } from '../../../assets/icons/comment.svg';
import { ReactComponent as IconFile } from '../../../assets/icons/file.svg';
import defaultImage from '../../../assets/images/air-france.png';
import audioImage from '../../../assets/images/audio.png';
import { decodeEntities } from '../../../utils/htmlEntities';
import { DATE_FORMAT } from '../../../constants/day';

const fileCategoryDefaultImage: Record<string, string> = {
  audio: audioImage,
};

type TProps = {
  title: string;
  image: string;
  createDate?: number;
  fileCount?: number;
  commentCount?: number;
  likeCount?: number;
  badgeTitle?: string;
  badgeColor?: string;
  outterWrapperClassName?: string;
  wrapperClassName?: string;
  className?: string;
  onClick?: () => void;
};

const LatestContentCard = ({
  title,
  image,
  createDate,
  likeCount = 0,
  commentCount = 0,
  fileCount = 0,
  badgeTitle,
  badgeColor,
  outterWrapperClassName,
  wrapperClassName,
  className,
  ...props
}: TProps) => (
  <div className={cx(styles.outterWrapper, outterWrapperClassName)}>
    <div
      className={cx(
        styles.wrapper,
        badgeTitle && styles.higher,
        wrapperClassName
      )}
    >
      <div className={cx(styles.imageWrapper, className)} {...props}>
        <img
          alt=""
          src={image || ''}
          onError={(e) => {
            e.currentTarget.src =
              fileCategoryDefaultImage[badgeTitle || ''] || defaultImage;
          }}
        />
        <div className={styles.overlay} />
        {(likeCount > 0 || commentCount > 0) && (
          <div className={cx(styles.icons, styles.top)}>
            {likeCount > 0 && (
              <span>
                <IconLike /> {likeCount}
              </span>
            )}
            {commentCount > 0 && (
              <span>
                <IconComment style={{ marginTop: 4 }} /> {commentCount}
              </span>
            )}
          </div>
        )}
        {fileCount > 0 && (
          <div className={cx(styles.icons, styles.bottom)}>
            <span>
              <IconFile /> {fileCount}
            </span>
          </div>
        )}
      </div>
      <div className={styles.info}>
        <h4 className={styles.title} title={decodeEntities(title)}>
          {decodeEntities(title)}
        </h4>
        <span className={cx(styles.meta, badgeTitle && styles.hasBadge)}>
          {badgeTitle && (
            <span
              className={styles.badge}
              style={{ backgroundColor: badgeColor || 'black' }}
            >
              {badgeTitle}
            </span>
          )}
          {createDate && dayjs.unix(createDate).format(DATE_FORMAT)}
        </span>
      </div>
    </div>
  </div>
);

export default LatestContentCard;
