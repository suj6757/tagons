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
  const [menuDropdown, setMenuDropdown] = useState(false);

  /* eslint-disable no-unused-vars */
  const showDropdown = (e) => {
    setMenuDropdown(!menuDropdown);
  }
  const hideDropdown = e => {
    setMenuDropdown(false);
  }

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
        <UncontrolledDropdown className="top-nav" isOpen={menuDropdown} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
          <DropdownToggle tag="div">
            <ul className="d-inline-block top-nav-list">
              <li><NavLink to="/app/prime/prime" activeClassName="active" className="nav-menu">PRIME</NavLink></li>
              <li className="mr50"><NavLink to="/app/gogo/start" activeClassName="active" className="nav-menu">TREND</NavLink></li>
              <li className="mr100"><NavLink to="#" activeClassName="" className="nav-menu">SOCIAL LISTENING</NavLink></li>
              <li className="mr100"><NavLink to="#" activeClassName="" className="nav-menu">ONLINE RETAILER</NavLink></li>
              <li className="mr50"><NavLink to="#" activeClassName="" className="nav-menu">SIMULATOR</NavLink></li>
              <li><NavLink to="#" activeClassName="" className="nav-menu">ABOUT TousFlux</NavLink></li>
            </ul>
          </DropdownToggle>
          <DropdownMenu>
            <div className="sub-menu-area">
              <ul className="sub-list1">
                <li><DropdownItem tag={NavLink} to="/app/prime/prime" activeClassName="active" className="sub-menu">STATES</DropdownItem></li>
                <li><DropdownItem tag={NavLink} to="/app/prime/channels" activeClassName="active" className="sub-menu">CHANNELS</DropdownItem></li>
              </ul>
              <ul className="sub-list2">
                <li><DropdownItem tag={NavLink} to="/app/trend/overview" activeClassName="active" className="sub-menu">OVERVIEW</DropdownItem></li>
                <li><DropdownItem tag={NavLink} to="/app/trend/social" activeClassName="active" className="sub-menu">SOCIAL</DropdownItem></li>
                <li><DropdownItem tag={NavLink} to="/app/trend/ecommerce" activeClassName="active" className="sub-menu">E-COMMERCE</DropdownItem></li>
                <li><DropdownItem tag={NavLink} to="/app/trend/googleAnalytics" activeClassName="active" className="sub-menu">GOOGLE ANALYTICS</DropdownItem></li>
                <li><DropdownItem tag={NavLink} to="/app/trend/response" activeClassName="active" className="sub-menu">TREND-RESPONSE</DropdownItem></li>
              </ul>
              <ul className="sub-list3"> 
                <li><DropdownItem tag={NavLink} to="/app/socialListening/sentimentanalysis" activeClassName="active" className="sub-menu">SENTIMENT ANALYSIS</DropdownItem></li>
                <li><DropdownItem tag={NavLink} to="/app/socialListening/needspatterns" activeClassName="active" className="sub-menu">NEEDS PATTERNS</DropdownItem></li>
              </ul>
              <ul className="sub-list4">
                <li><DropdownItem tag={NavLink} to="/app/onlineRetailer/onboard" activeClassName="active" className="sub-menu">ONBOARD</DropdownItem></li>
                <li><DropdownItem tag={NavLink} to="/app/onlineRetailer/overview" activeClassName="active" className="sub-menu">OVERVIEW</DropdownItem></li>
                <li><DropdownItem tag={NavLink} to="/app/onlineRetailer/productprice" activeClassName="active" className="sub-menu">PRODUCT &amp; PRICE</DropdownItem></li>
              </ul>
              <ul className="sub-list5">
                <li><NavLink to="#" activeClassName="" className="sub-menu">INFLUENCER</NavLink></li>
                <li><NavLink to="#" activeClassName="" className="sub-menu">ADS</NavLink></li>
                <li><NavLink to="#" activeClassName="" className="sub-menu">SELECT CHANNEL</NavLink></li>
              </ul>
              <ul className="sub-list6">
                <li><NavLink to="#" activeClassName="" className="sub-menu">TousFlux 소개</NavLink></li>
                <li><NavLink to="#" activeClassName="" className="sub-menu">사용법</NavLink></li>
                <li><NavLink to="#" activeClassName="" className="sub-menu">공지사항</NavLink></li>
              </ul>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span>
                <img alt="Profile" src="/assets/img/pic_default.png" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-2" right>
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
