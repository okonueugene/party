import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  BoxCubeIcon, CalenderIcon, ChevronDownIcon, GridIcon,
  HorizontaLDots, ListIcon, PageIcon, PieChartIcon,
  PlugInIcon, TableIcon, UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

// Types
type SubItem = { name: string; path: string; pro?: boolean; new?: boolean };
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubItem[];
};

const MENU_GROUPS: { title: string; items: NavItem[]; type: "main" | "others" }[] = [
  {
    title: "Menu",
    type: "main",
    items: [
      { icon: <GridIcon />, name: "Dashboard", subItems: [{ name: "Ecommerce", path: "/" }] },
      { icon: <CalenderIcon />, name: "Calendar", path: "/calendar" },
      { icon: <UserCircleIcon />, name: "User Profile", path: "/profile" },
      { icon: <ListIcon />, name: "Forms", subItems: [{ name: "Form Elements", path: "/form-elements" }] },
      { icon: <TableIcon />, name: "Tables", subItems: [{ name: "Basic Tables", path: "/basic-tables" }] },
      { icon: <PageIcon />, name: "Pages", subItems: [{ name: "Blank Page", path: "/blank" }, { name: "404 Error", path: "/error-404" }] },
    ],
  },
  {
    title: "Others",
    type: "others",
    items: [
      { icon: <PieChartIcon />, name: "Charts", subItems: [{ name: "Line Chart", path: "/line-chart" }, { name: "Bar Chart", path: "/bar-chart" }] },
      { icon: <BoxCubeIcon />, name: "UI Elements", subItems: [{ name: "Alerts", path: "/alerts" }, { name: "Badge", path: "/badge" }, { name: "Buttons", path: "/buttons" }] },
      { icon: <PlugInIcon />, name: "Authentication", subItems: [{ name: "Sign In", path: "/signin" }, { name: "Sign Up", path: "/signup" }] },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  const showFullContent = isExpanded || isHovered || isMobileOpen;

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  // Sync open submenu with current route on mount/navigation
  useEffect(() => {
    for (const group of MENU_GROUPS) {
      for (const [index, item] of group.items.entries()) {
        if (item.subItems?.some(sub => isActive(sub.path))) {
          setOpenSubmenu(`${group.type}-${index}`);
          return;
        }
      }
    }
  }, [isActive]);

  const handleSubmenuToggle = (id: string) => {
    setOpenSubmenu(prev => (prev === id ? null : id));
  };

const renderNavGroup = (title: string, items: NavItem[], groupType: string) => (
  <div className="mb-6">
    <h2 className={`mb-4 text-xs uppercase flex text-gray-400 ${!showFullContent ? "lg:justify-center" : "justify-start px-4"}`}>
      {showFullContent ? title : <HorizontaLDots className="size-6" />}
    </h2>
    <ul className="flex flex-col gap-2">
      {items.map((nav, index) => {
        const id = `${groupType}-${index}`;
        const isOpen = openSubmenu === id;
        const isSubActive = nav.subItems?.some(sub => isActive(sub.path));

        return (
          <li key={nav.name} className="px-3">
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(id)}
                aria-expanded={isOpen}
                // Removed justify-start/center from the button itself to use flex logic better
                className={`menu-item w-full group flex items-center rounded-lg transition-all duration-200 px-3 py-2 ${
                  isOpen || isSubActive ? "menu-item-active" : "menu-item-inactive"
                } ${!showFullContent ? "justify-center" : "justify-between"}`}
              >
                {/* WRAPPER: This keeps icon and text together */}
                <div className="flex items-center gap-3">
                  <span className={`menu-item-icon-size flex-shrink-0 ${isOpen || isSubActive ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                    {nav.icon}
                  </span>
                  {showFullContent && (
                    <span className="menu-item-text whitespace-nowrap">{nav.name}</span>
                  )}
                </div>

                {/* CHEVRON: Stays on the far right only when expanded */}
                {showFullContent && (
                  <ChevronDownIcon className={`ml-auto w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                )}
              </button>
            ) : (
              <Link 
                to={nav.path || "#"} 
                className={`menu-item group flex items-center rounded-lg px-3 py-2 gap-3 ${
                  isActive(nav.path!) ? "menu-item-active" : "menu-item-inactive"
                } ${!showFullContent ? "justify-center" : "justify-start"}`}
              >
                <span className={`menu-item-icon-size flex-shrink-0 ${isActive(nav.path!) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                  {nav.icon}
                </span>
                {showFullContent && <span className="menu-item-text whitespace-nowrap">{nav.name}</span>}
              </Link>
            )}

            {/* Submenu */}
            {nav.subItems && showFullContent && (
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="mt-2 space-y-1 ml-9 border-l border-gray-200 dark:border-gray-700">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.path}>
                      <Link 
                        to={subItem.path} 
                        className={`menu-dropdown-item flex items-center px-4 py-2 text-sm ${
                          isActive(subItem.path) ? "menu-dropdown-item-active font-medium" : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        {(subItem.new || subItem.pro) && (
                          <span className={`ml-auto menu-dropdown-badge ${isActive(subItem.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"}`}>
                            {subItem.new ? "new" : "pro"}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

  return (
    <aside
      className={`fixed mt-16 lg:mt-0 top-0 left-0 bg-white dark:bg-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 dark:border-gray-800 flex flex-col
        ${showFullContent ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 px-6 flex ${!showFullContent ? "lg:justify-center" : "justify-start"}`}>
        <Link to="/">
          <img src={showFullContent ? "/images/logo/logo.svg" : "/images/logo/logo-icon.svg"} alt="Logo" width={showFullContent ? 150 : 32} height={40} className="dark:invert" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        <nav>
          {MENU_GROUPS.map(group => renderNavGroup(group.title, group.items, group.type))}
        </nav>
        {showFullContent && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;