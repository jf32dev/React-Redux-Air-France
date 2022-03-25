import React from 'react';
import { getFileCategoryColor } from '../../../constants/fileCategory';
import useBridgeOpen from '../../../hooks/useBridgeOpen';
import bridge from '../../../services/bridge';
import { Story } from '../../../services/bridge/type/entities';
import { decodeEntities } from '../../../utils/htmlEntities';
import LatestContentCard from '../../shared/LatestContentCard';
import styles from './StoryDetail.module.scss';

type StoryDetailProps = {
  story: Story;
};

const StoryDetail = ({ story }: StoryDetailProps) => {
  const [openEntity] = useBridgeOpen(bridge.openEntity);

  const fileLength = story.files?.length;

  if (!fileLength) {
    return null;
  }

  const handleFileClick = (id: number) => () =>
    openEntity({ id, entityName: 'file', disableLegacyRouting: true });

  return (
    <div className={styles.story}>
      <h3>{`${decodeEntities(story.title)} (${fileLength} ${
        fileLength > 1 ? 'files' : 'file'
      })`}</h3>
      <div className={styles.files}>
        {story.files?.map((file) => (
          <LatestContentCard
            key={file.id}
            badgeColor={getFileCategoryColor(file.category)}
            badgeTitle={file.category}
            createDate={file.createDate}
            image={file.thumbnail}
            outterWrapperClassName={styles['latest-card-outter']}
            title={file.description}
            wrapperClassName={styles['latest-card-wrapper']}
            onClick={handleFileClick(file.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryDetail;
