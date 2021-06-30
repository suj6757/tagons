import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const About = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './about')
);
const AboutLink = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/about`} />
      <Route
        path={`${match.url}/about`}
        render={(props) => <About {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default AboutLink;