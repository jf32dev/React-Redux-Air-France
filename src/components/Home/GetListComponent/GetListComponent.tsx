/* eslint-disable no-nested-ternary */
import * as React from 'react';
import cx from 'classnames';
import useBridgeOpen from '../../../hooks/useBridgeOpen';
import { useList } from '../../../hooks/useList';
import bridge from '../../../services/bridge';
import { Story } from '../../../services/bridge/type/entities';
import Card from '../../shared/Card';
import HorizontalContentCard from '../../shared/HorizontalContentCard';
import Loader from '../../shared/Loader';
import styles from './GetListComponent.module.scss';
import LatestContentCard from '../../shared/LatestContentCard';

type GetLatest = {
  type: 'tab';
  tabIds: readonly number[];
};

type GetChannel = {
  type: 'channel';
  channelIds: readonly number[];
};

type GetListComponentProps = {
  limit?: number;
  itemStyle: 'card' | 'horizontal' | 'latest';
  className?: string;
  smallCard?: boolean;
  fulllist?: boolean;
  ensureLimit?: boolean;
} & (GetLatest | GetChannel);

const GetListComponent = ({
  itemStyle,
  className,
  smallCard,
  limit,
  ensureLimit,
  fulllist,
  ...rest
}: GetListComponentProps) => {
  const [list, loading] = useList<Story, Story>({
    request: () => {
      if (rest.type === 'channel') {
        return Promise.all(
          rest.channelIds.map((cid) =>
            bridge.getList<Story>({
              entityName: 'story',
              peid: cid,
              parentEntityName: 'channel',
              limit,
              includeAttributes: ['files'],
            })
          )
        );
      }

      return Promise.all(
        rest.tabIds.map((tid) =>
          bridge.getList<Story>({
            entityName: 'story',
            peid: tid,
            parentEntityName: 'tab',
            limit,
            includeAttributes: ['files'],
          })
        )
      );
    },
    afterRequest: (stories) => {
      const sorted = stories?.sort(
        (a, b) => b.initialCreateDate - a.initialCreateDate
      );
      return ensureLimit ? sorted?.slice(0, limit) : sorted;
    },
  });

  const [open] = useBridgeOpen(bridge.openEntity);

  const handleOnClick = (type: 'story' | 'file', id: number) => () => {
    open({
      id,
      entityName: type,
      disableLegacyRouting: true,
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <div
      className={cx(
        styles.container,
        smallCard && styles.fit,
        fulllist && styles.full,
        styles[itemStyle],
        className
      )}
    >
      {list.length > 0 ? (
        list.map((story) =>
          itemStyle === 'horizontal' ? (
            <HorizontalContentCard
              key={story.id}
              className={styles.card}
              commentCount={story.commentCount}
              createDate={story.initialCreateDate}
              fileCount={story.fileCount}
              likesCount={story.likesCount}
              thumbnail={story.thumbnail}
              title={story.title}
              onClick={handleOnClick('story', story.id)}
            />
          ) : itemStyle === 'card' ? (
            <Card
              key={story.id}
              createDate={story.initialCreateDate}
              featuredImage={story.featuredImage}
              initialCreateDate={story.initialCreateDate}
              small={smallCard}
              thumbnail={story.thumbnail}
              title={story.title}
              onClick={handleOnClick('story', story.id)}
            />
          ) : (
            <LatestContentCard
              key={story.id}
              className={styles.card}
              commentCount={story.commentCount}
              createDate={story.initialCreateDate}
              fileCount={story.fileCount}
              image={story.thumbnail}
              likeCount={story.likesCount}
              title={story.title}
              onClick={handleOnClick('story', story.id)}
              {...(fulllist && {
                outterWrapperClassName: styles['latest-card-outter'],
                wrapperClassName: styles['latest-card-wrapper'],
              })}
            />
          )
        )
      ) : (
        <span
          {...(smallCard && {
            style: {
              color: 'white',
            },
          })}
        >
          No Content
        </span>
      )}
    </div>
  );
};

export default GetListComponent;
