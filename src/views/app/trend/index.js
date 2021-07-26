/* eslint-disable import/prefer-default-export */
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Overview = React.lazy(() =>
  import(/* webpackChunkName: "Overview" */ './Overview')
);
const Social = React.lazy(() =>
  import(/* webpackChunkName: "Social" */ './Social')
);
const Ecommerce = React.lazy(() =>
  import(/* webpackChunkName: "Ecommerce" */ './Ecommerce')
);
const GoogleAnalytics = React.lazy(() =>
  import(/* webpackChunkName: "googleAnalytics" */ './googleAnalytics')
);

const OverViewLink = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/overview`} />
      <Route
        path={`${match.url}/overview`}
        render={(props) => <Overview {...props} />}
        />
      <Route
        path={`${match.url}/social`}
        render={(props) => <Social {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        render={(props) => <Ecommerce {...props} />}
      />
      <Route
        path={`${match.url}/googleAnalytics`}
        render={(props) => <GoogleAnalytics {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

export default OverViewLink;