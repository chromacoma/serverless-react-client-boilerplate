import React from 'react';
import { Helmet } from 'react-helmet';
import siteConstants from '../../_constants/site';

import './Home.scss';

const Home = () => (
  <div className="Home">
    <Helmet>
      <title>{`${siteConstants.SITE_TITLE}`}</title>
    </Helmet>
    <div className="row">
      <div className="col-md-12">
        <h2>Home.</h2>
      </div>
    </div>
  </div>
);

export default Home;
