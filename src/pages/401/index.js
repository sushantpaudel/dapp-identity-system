import React from 'react';
import { Link } from 'react-router-dom';
import meta_routes from 'admin/meta_routes';

const Page404 = () => {
  return (
    <div>
      This page is forbidden. <Link to={meta_routes.home}>Go home</Link>
    </div>
  );
};

export default Page404;
