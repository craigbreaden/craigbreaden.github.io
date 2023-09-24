import React, { useState, useMemo } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from 'classnames';
// import  from './icons/Logo';
// import {CollapseIcon} from './icons/CollapseIcon';

import { FaPizzaSlice, FaPoo, FaHome, FaCode, FaBlog, FaAddressBook, FaArrowLeft, FaBars } from "react-icons/fa";

const menuItems = [
  { id: 1, label: "Home", icon: FaHome, link: "/" },
  { id: 2, label: "About", icon: FaCode, link: "/about" },
  { id: 3, label: "Blog", icon: FaBlog, link: "/blog" },
  { id: 4, label: "Contact", icon: FaAddressBook, link: "/contact" },
];

const ids = menuItems.filter(menuItem => {
  return menuItem.id
})

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const router = useRouter();
  const wrapperClasses = classNames("h-screen px-4 pt-8 pb-4 flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  let activeMenu = useMemo(() => menuItems.find((menu) => menu.link === router.pathname), [router.pathname]);

  if (activeMenu === undefined) {
    activeMenu = { id: 1, label: "Home", icon: FaPizzaSlice, link: "/" }
  }

  const collapseIconClasses = classNames(
    "p-4 rounded bg-cyan-100 lighter absolaute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames("flex items-center cursor-pointer hover:bg-cyan-500 rounded w-full overflow-hidden whitespace-nowrap"
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  }

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  }

  return (
    <div className={wrapperClasses} onMouseEnter={onMouseOver} onMouseLeave={onMouseOver} style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <FaBars style={{ color: 'blue', fontSize: '30px' }} />
            <span className={classNames('mt-2 text-white font-medium text-text', { hidden: toggleCollapse, })}></span>
          </div>
          {isCollapsible && (<button className={collapseIconClasses} onClick={handleSidebarToggle}>
            <FaArrowLeft style={{ color: 'blue', fontSize: '20px' }} />
          </button>
          )}
        </div>
        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} id={menu.id}>
                <Link href={menu.link}>
                  <div className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (<span className={classNames("text-md font-medium text-text-light")} > {menu.label} </span>)}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar