import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  const isId = str => /^[0-9a-f]{24}$/i.test(str); // MongoDB ObjectId som exempel

  const visiblePathnames = pathnames.filter(p => !isId(p));

  const currentPageTitle = visiblePathnames.length > 0
    ? capitalize(visiblePathnames[visiblePathnames.length - 1].replace(/-/g, ' '))
    : 'Dashboard';

  return (
    <div className="breadcrumb-wrapper">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        {visiblePathnames.map((value, index) => {
          const to = `/${visiblePathnames.slice(0, index + 1).join('/')}`;
          const label = capitalize(value.replace(/-/g, ' '));

          return (
            <React.Fragment key={to}>
              <span>/</span>
              {index === visiblePathnames.length - 1 ? (
                <span className="breadcrumb-current">{label}</span>
              ) : (
                <Link to={to}>{label}</Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <h4 className="page-title">{currentPageTitle}</h4>
    </div>
  );
};

export default Breadcrumb;
