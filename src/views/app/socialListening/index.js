import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Needspatterns = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Needspatterns')
);

const Sentimentanalysis = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './Sentimentanalysis')
);

const SocialLink = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/needspatterns`} />
      <Route
        path={`${match.url}/needspatterns`}
        render={(props) => <Needspatterns {...props} />}
      />
      <Route
        path={`${match.url}/sentimentanalysis`}
        render={(props) => <Sentimentanalysis {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SocialLink;