import React from 'react';
import { Link } from 'react-router-dom';

const UnKnownRoute = () => {
  return (
    <div>
      <h1>404 not Found</h1>
      <Link to={'/'}>Back to Home</Link>
    </div>
  );
};

export default UnKnownRoute;
