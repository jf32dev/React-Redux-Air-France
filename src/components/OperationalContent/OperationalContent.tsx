/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'classnames';
import { useParams } from 'react-router';
import { useList } from '../../hooks/useList';
import bridge from '../../services/bridge';
import { Channel, Story } from '../../services/bridge/type/entities';
import Loader from '../shared/Loader';
import styles from './OperationalContent.module.scss';
import StoryDetail from './StoryDetail';
import { useThrottle } from '../../hooks/useThrottle';
import useStoreSelector from '../../stores';

type Params = {
  id: string;
};

const OperationalContent = () => {
  const { id } = useParams<Params>();

  const goToOperationalContent = useStoreSelector(
    (store) => store.route.goToOperationalContent
  );

  const [shouldDisplayMiniNav, setShouldDisplayMiniNav] = React.useState(false);

  const cardWrapper = React.useRef<HTMLDivElement>(null);

  const [channels, loadingChannels] = useList({
    request: () =>
      bridge.getList<Channel>({
        entityName: 'channel',
        parentEntityName: 'tab',
        peid: 41530,
        limit: 100,
      }),
  });

  const [stories, loadingStories] = useList({
    request: () =>
      bridge.getList<Story>({
        entityName: 'story',
        parentEntityName: 'channel',
        peid: +id || 0,
        limit: 100,
        includeAttributes: ['files'],
      }),
    immediate: !!channels.length,
    deps: [+id],
  });

  const currentSelectedChannel = channels.find((channel) => channel.id === +id);

  const handleScroll = useThrottle(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (cardWrapper.current) {
        const { scrollTop } = e.currentTarget;
        const { offsetHeight } = cardWrapper.current;

        const padding = 35;
        const hasReachedChannelTitle = scrollTop >= offsetHeight + padding;

        if (hasReachedChannelTitle) {
          setShouldDisplayMiniNav(true);
        } else {
          setShouldDisplayMiniNav(false);
        }
      }
    },
    50
  );

  const handleSelectChannel = (cid: number) => () => {
    goToOperationalContent(cid);
  };

  return (
    <div className={styles.container} onScroll={handleScroll}>
      <div ref={cardWrapper} className={styles.cards}>
        {loadingChannels ? (
          <Loader size="large" wrapperClassName={styles.load} />
        ) : (
          channels.map((channel) => (
            <div
              key={channel.id}
              className={cx(styles.card, +id === channel.id && styles.active)}
              onClick={handleSelectChannel(channel.id)}
            >
              <span className={styles.name}>{channel.name}</span>
            </div>
          ))
        )}
      </div>

      {currentSelectedChannel && (
        <h4 className={cx(styles.title, shouldDisplayMiniNav && styles.fixed)}>
          {currentSelectedChannel.name}
        </h4>
      )}

      <div className={cx(styles.stories, shouldDisplayMiniNav && styles.pt)}>
        {loadingStories ? (
          <Loader size="large" wrapperClassName={styles.load} />
        ) : stories.length > 0 ? (
          stories.map((story) => <StoryDetail key={story.id} story={story} />)
        ) : (
          <h3>No Content</h3>
        )}
      </div>
    </div>
  );
};

export default OperationalContent;
