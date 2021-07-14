import React, { useState, useEffect } from 'react';
/* eslint no-unused-vars: 0 */
import { 
  Row, 
  Card, 
  CardTitle, 
  Label, 
  FormGroup, 
  Button, 
  CustomInput, 
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications'; // eslint-disable-line no-unused-vars

import { loginUser, logoutUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction , logoutUserAction}) => {
  const [loginBefore, setLoginBefore] = useState(true);
  const [email] = useState('demo@gogo.com');
  const [password] = useState('gogo123');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const onLoginView = () => {
    setLoginBefore(false);
  }

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        loginUserAction(values, history);
      }
    }
  };

  const initialValues = { email, password };

  const handleLogout = () => {
    logoutUserAction(history);
  };

  return (
    <>
    <div className="user d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle className="p-0" color="empty">
          <span>
            <img alt="Profile" src="/assets/img/pic_default.png" />
          </span>
        </DropdownToggle>
        <DropdownMenu className="mt-2" right>
          <div className="name">
            <span>
              <img alt="Profile" src="/assets/img/pic_default.png" />
            </span>
            <p>관리자</p>
          </div>
          <DropdownItem>MY PAGE</DropdownItem>
          <DropdownItem onClick={() => onLoginView()}>LOGIN</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>

    <Row className={`h-100 login-area ${loginBefore && 'home-area'}`}>
      <Colxx xxs="12" md="12" className="mx-auto my-auto">
        <Card className="">
          <div className="">
            <NavLink to="/" className="home-logo white">
              <span className="logo-single" />
            </NavLink>

            {loginBefore === true ?
              <div className="quick-link">
                <NavLink to="/" className="link1">메뉴1</NavLink>
                <NavLink to="/" className="link2">메뉴2</NavLink>
                <NavLink to="/" className="link3">메뉴3</NavLink>
                <NavLink to="/" className="link4">메뉴4</NavLink>
                <NavLink to="/" className="link5">메뉴5</NavLink>
              </div>
            :
            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    {/* <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink> */}
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                  <CustomInput
                    type="checkbox"
                    id="exCustomCheckbox"
                    label="Remember me"
                    className="chk-remember"
                  />
                </Form>
              )}
            </Formik>
            }

          </div>
        </Card>
      </Colxx>
    </Row>
  </>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
  logoutUserAction: logoutUser,
})(Login);