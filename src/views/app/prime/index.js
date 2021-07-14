import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Prime = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Prime')
);
const PrimeLink = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/prime`} />
      <Route
        path={`${match.url}/prime`}
        render={(props) => <Prime {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PrimeLink;