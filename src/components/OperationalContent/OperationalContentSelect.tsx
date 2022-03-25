import React from 'react';
import cx from 'classnames';
import styles from './OperationalContent.module.scss';
import { useList } from '../../hooks/useList';
import bridge from '../../services/bridge';
import { Channel } from '../../services/bridge/type/entities';
import Loader from '../shared/Loader';
import useStoreSelector from '../../stores';

const OperationalContentSelect = () => {
  const [channels, loadingChannels] = useList({
    request: () =>
      bridge.getList<Channel>({
        entityName: 'channel',
        parentEntityName: 'tab',
        peid: 41530,
        limit: 100,
      }),
  });

  const goToOperationalContent = useStoreSelector(
    (store) => store.route.goToOperationalContent
  );

  const handleSelectChannel = (id: number) => () => {
    goToOperationalContent(id);
  };

  return (
    <div className={styles.container}>
      <div
        className={cx(
          styles.cards,
          styles.full,
          loadingChannels && styles.loading
        )}
      >
        {loadingChannels ? (
          <Loader size="large" wrapperClassName={styles.load} />
        ) : (
          channels.map((channel) => (
            <div
              key={channel.id}
              className={cx(styles.card, styles.full)}
              onClick={handleSelectChannel(channel.id)}
            >
              <span className={styles.name}>{channel.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OperationalContentSelect;
