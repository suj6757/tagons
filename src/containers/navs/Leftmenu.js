import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const LeftMenu = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [menu, setMenu] = useState('menu');

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
           {/* 메뉴별 컴포넌트 대체 작업 예정 */}
            {(() => {
              switch (menu) {
                case 'prime':
                  return <MenuItem active>STATES</MenuItem>;
                case 'trend':
                  return <MenuItem active>FASHION</MenuItem>;
                case 'social':
                  return <MenuItem active>SENTIMENT ANALYSIS</MenuItem>;
                case 'online':
                  return <MenuItem active>ON-BROAD</MenuItem>;
                case 'simulator':
                  return <MenuItem active>simulator</MenuItem>;
                case 'about':
                  return <MenuItem active>about</MenuItem>;
                default:
                  return null;
              }
            })()}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};

export default LeftMenu;