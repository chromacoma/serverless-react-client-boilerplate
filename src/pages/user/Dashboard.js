import React from 'react';
import { Helmet } from 'react-helmet';

import siteConstants from '../../_constants/site';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Helmet>
        <title>{`Dashboard | ${siteConstants.SITE_TITLE}`}</title>
      </Helmet>
      <div className="row">
        <div className="col-12">
          <h2>Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
