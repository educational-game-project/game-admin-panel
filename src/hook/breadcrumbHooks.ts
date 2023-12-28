import { useContext } from 'react';
import { BreadcrumbsContext } from '../context/BreadcrumbsContext';

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);
  if (context === undefined) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider');
  }
  return context;
};
