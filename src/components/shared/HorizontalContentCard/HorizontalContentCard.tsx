import dayjs from 'dayjs';
import * as React from 'react';
import cx from 'classnames';
import { Story } from '../../../services/bridge/type/entities';
import styles from './HorizontalContentCard.module.scss';
import { ReactComponent as Like } from '../../../assets/icons/like-outline.svg';
import { ReactComponent as File } from '../../../assets/icons/file-outline.svg';
import { ReactComponent as Comment } from '../../../assets/icons/comment-outline.svg';
import defaultImage from '../../../assets/images/air-france.png';
import { decodeEntities } from '../../../utils/htmlEntities';
import { DATE_FORMAT } from '../../../constants/day';

interface HorizontalContentCardProps {
  className?: string;
  onClick?: () => void;
}
const HorizontalContentCard = ({
  className,
  createDate,
  commentCount,
  title,
  likesCount,
  fileCount,
  thumbnail,
  onClick,
}: HorizontalContentCardProps &
  Pick<
    Story,
    | 'title'
    | 'likesCount'
    | 'commentCount'
    | 'fileCount'
    | 'createDate'
    | 'thumbnail'
  >) => {
  return (
    <div className={cx(styles.card, className)} onClick={onClick}>
      <img
        alt=""
        src={thumbnail}
        onError={(e) => {
          e.currentTarget.src = defaultImage;
        }}
      />
      <div className={styles.content}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {dayjs.unix(createDate).format(DATE_FORMAT)}
          </span>
          <span className={styles.title}>{decodeEntities(title)}</span>
        </div>
        <div className={styles.count}>
          <span className={styles.icon}>
            {fileCount > 0 && (
              <>
                <File /> {fileCount} {fileCount > 1 ? 'Files' : 'File'}
              </>
            )}
          </span>
          <div className={styles.misc}>
            <span className={styles.icon}>
              <Like /> {likesCount}
            </span>
            <span className={styles.icon}>
              <Comment /> {commentCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalContentCard;
