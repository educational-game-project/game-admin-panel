import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HomeIcon } from 'lucide-react';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';

function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();
  const [isOnTop, setIsOnTop] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 4) {
      setIsOnTop(false);
    } else {
      setIsOnTop(true);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <ul
      className={`flex items-center space-x-2 pt-2 mb-5 relative ${
        isOnTop ? 'z-10' : 'z-0'
      }`}>
      <li className="flex items-center">
        <Link
          to="/"
          className="flex items-center text-gray-500 mr-2 font-medium">
          <HomeIcon
            size={16}
            className="mr-1.5"
          />
          <span className="leading-none">Home</span>
        </Link>
        {breadcrumbs.length !== 0 && (
          <ChevronRight
            size={16}
            strokeWidth={2}
            className="text-gray-500"
          />
        )}
      </li>
      {breadcrumbs?.map((breadcrumb, index) => (
        <li
          className="flex items-center"
          key={index}>
          <Link
            to={breadcrumb.path}
            className={`flex items-center mr-2 ${
              index + 1 === breadcrumbs.length
                ? 'text-indigo-800 font-medium'
                : 'text-gray-500'
            }`}>
            {breadcrumb.icon}
            <span className="leading-none">{breadcrumb.label}</span>
          </Link>
          {index + 1 !== breadcrumbs.length && (
            <ChevronRight
              size={16}
              strokeWidth={2}
              className="text-gray-500"
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Breadcrumbs;
