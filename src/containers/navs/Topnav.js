// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
} from '../../redux/actions';

import {
  searchPath,
  adminRoot,
} from '../../constants/defaultValues';

const TopNav = ({
  history,
  logoutUserAction,
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const handleLogout = () => {
    logoutUserAction(history);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink className="navbar-logo" to={adminRoot}>
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </NavLink>
        {/* <div className="login-info">
          <span className="name">AAA님</span>
          <span className="calendar">| 19.01.01~21.03.31</span>
        </div> */}
      </div>
      <div className="navbar-right">
         <ul className="d-inline-block top-nav-list">
          <li><NavLink to="#" activeClassName="active" className="nav-menu">PRIME</NavLink></li>
          <li><NavLink to="#" activeClassName="active" className="nav-menu">TREND</NavLink></li>
          <li><NavLink to="#" activeClassName="active" className="nav-menu">SOCIAL LISTENING</NavLink></li>
          <li><NavLink to="#" activeClassName="active" className="nav-menu">ONLINE RETAILER</NavLink></li>
          <li><NavLink to="#" activeClassName="active" className="nav-menu">SIMULATOR</NavLink></li>
          <li><NavLink to="#" activeClassName="active" className="nav-menu">ABOUT TousFlux</NavLink></li>
        </ul>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span>
                <img alt="Profile" src="/assets/img/pic_default.png" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <div className="name">
                <span>
                  <img alt="Profile" src="/assets/img/pic_default.png" />
                </span>
                <p>관리자</p>
              </div>
              <DropdownItem>MY PAGE</DropdownItem>
              <DropdownItem onClick={() => handleLogout()}>LOGOUT</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
  })(TopNav)
);
