/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { observer } from 'mobx-react-lite';
import backgroundImg from '../../assets/images/AF-banner.jpg';
import Banner from './Banner';
import styles from './Home.module.scss';
import toolItemStyles from '../shared/ToolList/ToolList.module.scss';
import Profile from '../shared/Profile';
import useStoreSelector from '../../stores';
import { getAirFranceToolsAndMissions } from '../../constants';
import Loader from '../shared/Loader';
import Tabs from '../shared/Tabs';
import GetListComponent from './GetListComponent';
import LatestContent from './LatestContent';
import { STATIC_CONTENT } from '../../constants/content';
import ToolList from '../shared/ToolList';
import MediaContent from './MediaContent';
import Feedback from '../../assets/icons/tools/Feedback.png';
import useBridgeOpen from '../../hooks/useBridgeOpen';
import bridge from '../../services/bridge';

const Home = () => {
  const { loginUser, getLoginUser, state, appName, formId } = useStoreSelector(
    (store) => store.user
  );

  const { goToFullList } = useStoreSelector((store) => store.route);

  const [openEntity] = useBridgeOpen(bridge.openEntity);

  const { tools, missions } = getAirFranceToolsAndMissions(
    appName === 'Hub Web App'
  );

  React.useEffect(() => {
    getLoginUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (formId) {
      openEntity({ entityName: 'file', id: formId });
    }
  };

  return (
    <section className={styles.home}>
      <Banner backgroundImage={backgroundImg} className={styles.banner}>
        {state.status === 'loading' ? (
          <Loader />
        ) : loginUser ? (
          <Profile user={loginUser} />
        ) : (
          <div />
        )}
        <h3>
          MON <strong>APPLI</strong>
        </h3>
      </Banner>

      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles['top-content']}>
            <Tabs highlighted>
              <Tabs.Tab
                tabKey={STATIC_CONTENT.MOT_DU_MARDI.key}
                title={STATIC_CONTENT.MOT_DU_MARDI.title}
                onSeeMoreClick={goToFullList}
              >
                <GetListComponent
                  channelIds={STATIC_CONTENT.MOT_DU_MARDI.channelIds}
                  className={styles.single}
                  itemStyle={STATIC_CONTENT.MOT_DU_MARDI.style}
                  limit={1}
                  type={STATIC_CONTENT.MOT_DU_MARDI.type}
                  ensureLimit
                  smallCard
                />
              </Tabs.Tab>
            </Tabs>
            <Tabs>
              <Tabs.Tab
                tabKey={STATIC_CONTENT.A_LA_UNE.key}
                title={STATIC_CONTENT.A_LA_UNE.title}
                onSeeMoreClick={goToFullList}
              >
                <GetListComponent
                  channelIds={STATIC_CONTENT.A_LA_UNE.channelIds}
                  itemStyle={STATIC_CONTENT.A_LA_UNE.style}
                  limit={2}
                  type={STATIC_CONTENT.A_LA_UNE.type}
                  ensureLimit
                />
              </Tabs.Tab>
            </Tabs>
          </div>

          <Tabs>
            <Tabs.Tab
              tabKey={STATIC_CONTENT.NEWS.key}
              title={STATIC_CONTENT.NEWS.title}
              titleWidth={158}
              onSeeMoreClick={goToFullList}
            >
              <GetListComponent
                channelIds={STATIC_CONTENT.NEWS.channelIds}
                itemStyle={STATIC_CONTENT.NEWS.style}
                limit={4}
                type={STATIC_CONTENT.NEWS.type}
                ensureLimit
              />
            </Tabs.Tab>

            <Tabs.Tab
              tabKey={STATIC_CONTENT.MEDIA.key}
              title={STATIC_CONTENT.MEDIA.title}
              titleWidth={142}
              onSeeMoreClick={goToFullList}
            >
              <MediaContent />
            </Tabs.Tab>
            <Tabs.Tab
              tabKey={STATIC_CONTENT.LATEST.key}
              title={STATIC_CONTENT.LATEST.title}
              titleWidth={163}
              onSeeMoreClick={goToFullList}
            >
              <LatestContent />
            </Tabs.Tab>
          </Tabs>
        </div>

        <Tabs disableSeeMore>
          <Tabs.Tab
            tabKey="My daily tools"
            title="Mon Quotidien"
            titleWidth={135}
          >
            <ToolList>
              {state.status === 'loading' ? (
                <Loader />
              ) : (
                <>
                  <span className={toolItemStyles.item} onClick={handleClick}>
                    <img alt="" src={Feedback} />
                    <span>Vos Suggestions</span>
                  </span>
                  {tools.map((tool) => (
                    <ToolList.Item
                      key={tool.title}
                      icon={tool.icon}
                      link={tool.link}
                      title={tool.title}
                    />
                  ))}
                </>
              )}
            </ToolList>
          </Tabs.Tab>

          <Tabs.Tab tabKey="My Mission" title="Ma Mission" titleWidth={109}>
            <ToolList>
              {state.status === 'loading' ? (
                <Loader />
              ) : (
                missions.map((tool) => (
                  <ToolList.Item
                    key={tool.title}
                    icon={tool.icon}
                    link={tool.link}
                    title={tool.title}
                  />
                ))
              )}
            </ToolList>
          </Tabs.Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default observer(Home);
