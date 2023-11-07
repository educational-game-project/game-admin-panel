import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';
import { ChevronRight, HomeIcon } from 'lucide-react';

function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <section className="flex">
      <ul className="flex items-center space-x-3 px-3 py-1.5 rounded-md bg-indigo-100">
        <li>
          <Link
            to="/"
            className="flex items-center">
            <HomeIcon
              size={16}
              className="mr-2"
            />
            Home
          </Link>
        </li>
        <li>
          <ChevronRight size={16} />
        </li>
        {breadcrumbs.map((breadcrumb) => (
          <>
            <li key={breadcrumb.label}>
              <Link
                to={breadcrumb.path}
                className="flex items-center">
                {breadcrumb.icon}
                {breadcrumb.label}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} />
            </li>
          </>
        ))}
      </ul>
    </section>
  );
}

export default Breadcrumbs;
