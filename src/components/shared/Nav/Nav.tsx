import * as React from 'react';
import { Link } from 'react-router-dom';
import { getSpecificChildren } from '../../../utils/element';
import styles from './Nav.module.scss';
import NavItem from './NavItem';

type NavProps = {
  logo: React.ReactNode;
};

const Nav = ({ children, logo }: React.PropsWithChildren<NavProps>) => {
  const navItems = getSpecificChildren({
    children,
    displayName: 'NavItem',
  });

  return (
    <div className={styles.nav}>
      <Link className={styles.logo} to="/">
        {logo}
      </Link>
      <nav>{navItems}</nav>
    </div>
  );
};

Nav.Item = NavItem;
export default Nav;
