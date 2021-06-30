import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from '../containers/navs/Topnav';
import LeftMenu from '../containers/navs/Leftmenu';

const AppLayout = ({ containerClassnames, children, history }) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <ul className="location">
        <li>TREND</li>
        <li>INDUSTRY</li>
      </ul>
      <div className="container-warp">
        <LeftMenu />
        <main>
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
