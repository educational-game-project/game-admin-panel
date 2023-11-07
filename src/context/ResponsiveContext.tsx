import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react';

type ResponsiveProviderProps = {
  children: ReactNode;
};
const ResponsiveContext = createContext<boolean | undefined>(undefined);

export const ResponsiveProvider = ({ children }: ResponsiveProviderProps) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 768
  );

  const handleResize = () => {
    setIsDesktopView(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={isDesktopView}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export function useResponsiveLayout() {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error(
      'useResponsiveLayout must be used within a ResponsiveProvider'
    );
  }
  return context;
}
