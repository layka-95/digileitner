import { Fragment } from 'react';

import MainNavigation from './main-navigation';

function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <hr className="menu__blog-hr" />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
