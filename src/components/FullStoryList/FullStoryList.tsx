import * as React from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import styles from './FullStoryList.module.scss';
import useStoreSelector from '../../stores';
import { ReactComponent as Back } from '../../assets/images/back.svg';
import Container from '../shared/Container';
import { STATIC_CONTENT } from '../../constants';
import GetListComponent from '../Home/GetListComponent';
import MediaContent from '../Home/MediaContent';

type TypeEntity = {
  type: keyof typeof STATIC_CONTENT;
};

const FullStoryList = () => {
  const { history } = useStoreSelector((store) => store.route);
  const { type } = useParams<TypeEntity>();
  const staticContent = STATIC_CONTENT[type];

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.back} onClick={() => history.push('/')}>
          <Back height="15" width="15" />
          Back
        </div>
        <h3>{staticContent.title}</h3>
      </div>

      <Container className={styles.container}>
        {staticContent.key === 'MEDIA' ? (
          <MediaContent fulllist />
        ) : (
          <GetListComponent
            itemStyle={staticContent.style}
            limit={100}
            fulllist
            {...(staticContent.type === 'channel'
              ? {
                  type: 'channel',
                  channelIds: staticContent.channelIds,
                }
              : {
                  type: 'tab',
                  tabIds: staticContent.tabIds,
                })}
          />
        )}
      </Container>
    </div>
  );
};

export default observer(FullStoryList);
