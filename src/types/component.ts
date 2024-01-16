interface Breadcrumb {
  icon: string;
  label: string | undefined;
  path: string;
}

interface BreadcrumbState {
  breadcrumbs: Breadcrumb[];
}

interface BreadcrumbIconProps {
  name: string | undefined;
}

export type { Breadcrumb, BreadcrumbState, BreadcrumbIconProps };
