import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ProductPrice = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Productprice')
);

const Onboard = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Onboard')
);

const Overview = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Overview')
);

const SocialLink = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/onboard`} />
      <Route
        path={`${match.url}/productprice`}
        render={(props) => <ProductPrice {...props} />}
      />
      <Route
        path={`${match.url}/onboard`}
        render={(props) => <Onboard {...props} />}
      />
      <Route
        path={`${match.url}/overview`}
        render={(props) => <Overview {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SocialLink;