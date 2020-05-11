import React from 'react';

import './Loader.scss';

const Loader = ({ showSpinner = false, ...props }) => (
  <div className="Loader">
    <i hidden={!showSpinner} className="fa fa-refresh spinning"></i>
  </div>
);

export default Loader;
