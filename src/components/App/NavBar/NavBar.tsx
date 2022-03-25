import React from 'react';
import { useLocation } from 'react-router';
import { NAV_MAPPING } from '../../../constants';
import useBridgeOpen from '../../../hooks/useBridgeOpen';
import bridge from '../../../services/bridge';
import Nav from '../../shared/Nav';
import { ReactComponent as Logo } from '../../../assets/images/airfrance-logo.svg';
import useStoreSelector from '../../../stores';

const NavBar = () => {
  const [openEntity] = useBridgeOpen(bridge.openEntity);

  const goToOperationalContentSelect = useStoreSelector(
    (store) => store.route.goToOperationalContentSelect
  );

  const location = useLocation();

  const handleNavItemClick = (item: typeof NAV_MAPPING[number]) => () => {
    if (item.title === 'Documentation Opérationnelle') {
      if (!location.pathname.includes('operational-content')) {
        goToOperationalContentSelect();
      }
    } else {
      openEntity({
        entityName: item.type,
        id: item.id,
      });
    }
  };

  return (
    <Nav logo={<Logo height="19" width="200" />}>
      {NAV_MAPPING.map((item) => (
        <Nav.Item
          key={item.key}
          active={location.pathname.includes(item.key)}
          onClick={handleNavItemClick(item)}
        >
          {item.title}
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default NavBar;
