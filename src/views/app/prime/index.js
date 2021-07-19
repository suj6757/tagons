import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Prime = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Prime')
);
const Channels = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Channels')
);

const PrimeLink = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/prime`} />
      <Route
        path={`${match.url}/prime`}
        render={(props) => <Prime {...props} />}
      />
      <Route
        path={`${match.url}/channels`}
        render={(props) => <Channels {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PrimeLink;