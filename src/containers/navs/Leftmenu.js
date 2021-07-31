/* eslint no-unused-vars: "off" */
import React, { useState } from "react";
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {LeftPrime ,LeftTrend, LeftSocial, LeftOnline, LeftSimulator, LeftAbout} from './Leftmenulist';

const LeftMenu = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const menuIconClick = () => (
    menuCollapse ? setMenuCollapse( false ) : setMenuCollapse( true )
  )
  
  return (
    <>
      <ProSidebar className="left-menu" collapsed={menuCollapse} >
        <SidebarHeader>
          <button type="button" className="closemenu" onClick={menuIconClick} onKeyDown={menuIconClick}>
            {menuCollapse ? (
              <span className="folding_on">열기</span>
            ) : (
              <span className="folding_off">닫기</span>
            )}
          </button>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <Switch>
              <Route path={['/app/prime/prime', '/app/prime/channels']} component={LeftPrime} />
              <Route exact path={['/app/gogo/start', '/app/trend/overview', '/app/trend/social', '/app/trend/ecommerce', '/app/trend/googleAnalytics', '/app/trend/response']} component={LeftTrend} />
              <Route path={['/app/socialListening/needspatterns']} component={LeftSocial} />
              <Route path="/app/onlineRetailer" component={LeftOnline} />
              <Route path="/app/simulator" component={LeftSimulator} />
              <Route path="/app/about" component={LeftAbout} />
              <Redirect to="/error" />
            </Switch>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};

export default LeftMenu;