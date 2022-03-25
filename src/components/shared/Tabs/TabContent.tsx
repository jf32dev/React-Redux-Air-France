import React from 'react';
import { mapValidChildren } from '../../../utils/element';

type TProps = {
  activeTab: string;
  className?: string;
};

const TabContent = ({
  activeTab,
  className,
  children,
}: React.PropsWithChildren<TProps>) => (
  <div className={className}>
    {mapValidChildren(children, (child) => {
      const { tabKey } = child.props;
      if (!tabKey) {
        throw Error('Expected <TabPane /> with tabKey prop');
      }
      if (activeTab !== tabKey) {
        return null;
      }
      return child;
    })}
  </div>
);

export default TabContent;
