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
import axios from 'axios';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications'; // eslint-disable-line no-unused-vars

import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { login, UserInfo, logout } from '../../services/LoginService';
import { setCurrentUser } from '../../helpers/Utils';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction , logoutUserAction}) => {
  const [loginBefore, setLoginBefore] = useState(UserInfo() !== null);
  const [email] = useState('testuser');
  const [password] = useState('1234');
  const [rememberMe] = useState(false);

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const onLoginView = () => {
    setLoginBefore(false);
  }

  const onLogout = () => {
    logout();
  }

  const onUserLogin = (values) => {
    var requestData = {};
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        requestData.UserId = values.email;
        requestData.UserPassword = values.password;
        axios.post("/login/Login", requestData)
        .then((response) => {
          console.log('userLogin ->', response.data);
          let errCode = response.data.ErrorCode;
          let errMsg = response.data.Message;
          if (errCode === "OK") {
            // 로그인 성공
            login(response.data.Userinfo, rememberMe);
            setCurrentUser(response.data.Userinfo);
            // TODO: Prime -> State 이동
            history.push('/app/prime/prime');
            console.log('CompanyName', UserInfo().CompanyName);
          }
          else {
            // 로그인 실패
            // alert(errMsg);
            NotificationManager.error(errMsg, '로그인 실패', 3000, null, null, '');
          }
        })
        .catch(function (error1) {
            console.log(error1);
        });
      }
    }
  };

  const initialValues = { email, password, rememberMe };

  const handleLogout = () => {
    // logoutUserAction(history);
    console.log('handleLogout');
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
            <p>{UserInfo() !== null ? UserInfo().CompanyName : ""}</p>
          </div>
          <DropdownItem>MY PAGE</DropdownItem>
          <DropdownItem onClick={() => onLoginView()}>LOGIN</DropdownItem>
          <DropdownItem onClick={() => onLogout() }>LOGOUT</DropdownItem>
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
                    />
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
                    name="rememberMe"
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
export default Login ;
/* const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
  logoutUserAction: logoutUser,
})(Login); */