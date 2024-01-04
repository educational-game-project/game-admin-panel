import { ReactNode, createContext, useState } from "react";

type SidebarProviderProps = {
  children: ReactNode;
};
type SidebarContext = {
  expanded: boolean;
  sidebarToggle: () => void;
};

export const SidebarContext = createContext({} as SidebarContext);

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [expanded, setExpanded] = useState(true);

  const sidebarToggle = () => {
    setExpanded((curr) => !curr);
  };

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        sidebarToggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
