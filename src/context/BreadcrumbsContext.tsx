import {
  Dispatch,
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";

type BreadcrumbsProviderProps = {
  children: ReactNode;
};
interface BreadcrumbsProps {
  icon: ReactNode;
  label: string;
  path: string;
}
interface BreadcrumbsContextProps {
  breadcrumbs: BreadcrumbsProps[];
  setBreadcrumbs: Dispatch<SetStateAction<BreadcrumbsProps[]>>;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextProps | undefined>(
  undefined
);

export const BreadcrumbsProvider = ({ children }: BreadcrumbsProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>([]);

  return (
    <BreadcrumbsContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);
  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
  }
  return context;
};
