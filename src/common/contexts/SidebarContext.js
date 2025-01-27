import { createContext, useContext } from "react";

const SidebarContext = createContext({ isSideBarOpen: true });

export const SidebarContextProvider = ({ children, isSideBarOpen }) => {
  return <SidebarContext.Provider value={{ isSideBarOpen }}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
