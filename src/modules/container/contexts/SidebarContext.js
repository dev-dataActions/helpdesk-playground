import { useState, createContext, useContext } from "react";

const SidebarContext = createContext({});

export const SidebarContextProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
