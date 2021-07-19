import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const AboutLink = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './about')
);
const PrimeLink = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './prime')
);
const OverViewLink = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './trend')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
            <Route
              path={`${match.url}/gogo`}
              render={(props) => <Gogo {...props} />}
            />
            <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            />
            <Route
              path={`${match.url}/about`}
              render={(props) => <AboutLink {...props} />}
            />
            <Route
              path={`${match.url}/prime`}
              render={(props) => <PrimeLink {...props} />}
            />
            <Route
              path={`${match.url}/trend`}
              render={(props) => <OverViewLink {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
