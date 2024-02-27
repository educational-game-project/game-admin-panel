import { useContext } from 'react';
import { ResponsiveContext } from '../context/ResponsiveContext';

export function useResponsiveLayout() {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error(
      'useResponsiveLayout must be used within a ResponsiveProvider'
    );
  }
  return context;
}
