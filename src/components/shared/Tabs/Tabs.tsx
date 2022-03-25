import React from 'react';
import cx from 'classnames';
import styles from './Tabs.module.scss';
import TabNav from './TabNav';
import TabNavItem from './TabNavItem';
import TabPane from './TabPane';
import TabContent from './TabContent';
import { forEachChild, mapValidChildren } from '../../../utils/element';

type TProps = {
  activeKey?: string;
  defaultActiveKey?: string;
  navContainerClassName?: string;
  onTabSelect?: (key: string) => void;
  disableSeeMore?: boolean;
  highlighted?: boolean;
};

const getDefaultActiveKey = (children: React.ReactNode) => {
  let activeKey: string | null = null;

  forEachChild(children, (child) => {
    if (!activeKey) {
      activeKey = child.props.tabKey;
    }
  });

  if (!activeKey) {
    throw Error(
      'Expected <Tabs /> to have children, or its children to have tabKey assigned, please use <Tabs.Tab /> as its children'
    );
  }

  return activeKey;
};

const Tabs = ({
  children,
  defaultActiveKey = getDefaultActiveKey(children),
  activeKey,
  navContainerClassName,
  onTabSelect,
  disableSeeMore,
  highlighted,
}: React.PropsWithChildren<TProps>) => {
  const [active, setActive] = React.useState(defaultActiveKey);
  const seeMoreCallBackRegistry = React.useRef<Record<string, any>>({});

  const setKey = (key: string) => () => {
    if (onTabSelect) {
      onTabSelect(key);
    } else {
      setActive(key);
    }
  };

  const renderTab = (child: React.ReactElement) => {
    const {
      title,
      tabKey,
      navClassName,
      activeNavClassName,
      titleWidth,
      onSeeMoreClick,
    } = child.props;

    if (!title) {
      return null;
    }

    seeMoreCallBackRegistry.current[tabKey] = onSeeMoreClick;

    return (
      <TabNavItem
        active={(activeKey || active) === tabKey}
        activeClassName={activeNavClassName}
        className={navClassName}
        inverted={highlighted}
        tabKey={tabKey}
        title={title}
        titleWidth={titleWidth}
        onSelect={setKey(tabKey)}
      />
    );
  };

  const handleSeeMoreClick = () => {
    if (seeMoreCallBackRegistry.current[activeKey || active || '']) {
      seeMoreCallBackRegistry.current[activeKey || active || ''](
        activeKey || active
      );
    }
  };

  return (
    <div className={cx(styles.tabs, highlighted && styles.highlighted)}>
      <div className={styles['nav-container']}>
        <TabNav
          className={styles.nav}
          containerClassName={navContainerClassName}
        >
          {mapValidChildren(children, renderTab)}
        </TabNav>
        {!disableSeeMore && (
          <span className={styles.more} onClick={handleSeeMoreClick}>
            Voir Plus
          </span>
        )}
      </div>

      <TabContent
        key={activeKey || active}
        activeTab={activeKey || active}
        className={styles.tab}
      >
        {children}
      </TabContent>
    </div>
  );
};

Tabs.Nav = TabNav;
Tabs.NavItem = TabNavItem;
Tabs.Tab = TabPane;

export default Tabs;
