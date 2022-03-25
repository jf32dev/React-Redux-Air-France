import * as React from 'react';
import cx from 'classnames';
import styles from './Banner.module.scss';

interface BannerProps {
  className?: string;
  backgroundImage?: string;
}
const Banner = ({
  backgroundImage,
  className,
  children,
}: React.PropsWithChildren<BannerProps>) => {
  return (
    <div
      className={cx(styles.banner, className)}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={styles.mask} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Banner;
