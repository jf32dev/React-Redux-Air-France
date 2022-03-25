import * as React from 'react';
import { STATIC_CONTENT } from '../../../constants';
import useBridgeOpen from '../../../hooks/useBridgeOpen';
import { useList } from '../../../hooks/useGetList';
import bridge from '../../../services/bridge';
import { Story } from '../../../services/bridge/type/entities';
import LatestContentCard from '../../shared/LatestContentCard';
import Loader from '../../shared/Loader';
import styles from './LatestContent.module.scss';

const LatestContent = () => {
  const [latestContent, loading] = useList(() =>
    bridge.getList<Story>({
      entityName: 'story',
      parentEntityName: 'tab',
      peid: STATIC_CONTENT.LATEST.tabIds[0],
      limit: 10,
    })
  );

  const [open] = useBridgeOpen(bridge.openEntity);

  const handleOnClick = (id: number) => () => {
    open({
      id,
      entityName: 'story',
      disableLegacyRouting: true,
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      {latestContent.map((story) => (
        <LatestContentCard
          key={story.id}
          className={styles.card}
          commentCount={story.commentCount}
          createDate={story.initialCreateDate}
          fileCount={story.fileCount}
          image={story.thumbnail}
          likeCount={story.likesCount}
          title={story.title}
          onClick={handleOnClick(story.id)}
        />
      ))}
    </div>
  );
};

export default LatestContent;
