import { observer } from 'mobx-react-lite';
import * as React from 'react';
import cx from 'classnames';
import { getFileCategoryColor } from '../../../constants/fileCategory';
import useBridgeOpen from '../../../hooks/useBridgeOpen';
import bridge from '../../../services/bridge';
import useStoreSelector from '../../../stores';
import LatestContentCard from '../../shared/LatestContentCard';
import Loader from '../../shared/Loader';
import styles from './MediaContent.module.scss';

type MediaContentProps = {
  fulllist?: boolean;
};

const MediaContent = ({ fulllist }: MediaContentProps) => {
  const { media, getMedia, getMediaForIOS, loading } = useStoreSelector(
    (store) => store.media
  );
  const { appName } = useStoreSelector((store) => store.user);

  const [open] = useBridgeOpen(bridge.openEntity);

  const handleOnClick = (id: number) => () => {
    open({
      id,
      entityName: 'file',
      disableLegacyRouting: true,
    });
  };

  React.useEffect(() => {
    if (appName === 'Hub Web App') {
      getMedia(fulllist ? 100 : 10);
    } else {
      getMediaForIOS();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fulllist, appName]);

  return loading ? (
    <Loader />
  ) : (
    <div className={cx(styles.container, fulllist && styles.full)}>
      {media?.length > 0 ? (
        media?.map((file) => (
          <LatestContentCard
            key={file.id}
            badgeColor={getFileCategoryColor(file.category)}
            badgeTitle={file.category}
            className={styles.card}
            createDate={file.createDate}
            image={file.thumbnail}
            title={file.description}
            onClick={handleOnClick(file.id)}
            {...(fulllist && {
              outterWrapperClassName: styles['latest-card-outter'],
              wrapperClassName: styles['latest-card-wrapper'],
            })}
          />
        ))
      ) : (
        <span>No Content</span>
      )}
    </div>
  );
};

export default observer(MediaContent);
