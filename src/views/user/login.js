import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../components/common/react-notifications'; // eslint-disable-line no-unused-vars
import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const validatePassword = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your password';
    }
    else if (value.length < 4) {
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

// 처음 있던 소스 백업
// const callLoginApi = async (values,setResponsData) =>{ // eslint-disable-line no-unused-vars

//   const userInfo = { UserId : 'testuser', 
//                      UserPassword : '1234', }; 
//   /* const userInfo = { UserId : values.email, 
//                      UserPassword : values.password, }; */
//   await axios.post("/api/Login",userInfo)
//     .then(function (response) {
//       console.log(response);
//       setResponsData(JSON.stringify(response) );
//       // loginUserAction(values, history); // 여기가 로그인 확인
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

const Login = ({ history, loading, error, loginUserAction }) => {
    const [email] = useState('demo@gogo.com');
    const [password] = useState('gogo123');
    const store = useSelector(state => state.authUser);
    // dispatch : 최신 Hook 방식 
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
        }
    }, [error]);

    const onUserLogin = (values) => {
        if (!loading) {
            if (values.email !== '' && values.password !== '') {         
                //이메일, 비밀번호
                console.log('param!! : ', values);
                
                // dispatch : 최신 Hook 방식 (loginUser는 액션명)
                dispatch(loginUser(values, history));

                // dispatch : 예전 connect 방식 (loginUserAction는 액션 객체 생성 함수명)
                // loginUserAction(values, history);

                //스토어
                console.log('result : ', store);
            }
        }
    };

    const initialValues = { email, password };

    return (
        <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                    <div className="position-relative image-side ">
                        <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                        <p className="white mb-0">
                            Please use your credentials to login.
                            <br />
                            If you are not a member, please{' '}
                            <NavLink to="/user/register" className="white">
                                register
                            </NavLink>
                            .
                        </p>
                    </div>

                    <div className="form-side">
                        <NavLink to="/" className="white">
                            <span className="logo-single" />
                        </NavLink>
                        <CardTitle className="mb-4">
                            <IntlMessages id="user.login-title" />
                        </CardTitle>

                        <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                            {({ errors, touched }) => (
                                <Form className="av-tooltip tooltip-label-bottom">
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="user.email" />
                                        </Label>
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
                                        <Label>
                                            <IntlMessages id="user.password" />
                                        </Label>
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
                                        <NavLink to="/user/forgot-password">
                                            <IntlMessages id="user.forgot-password-question" />
                                        </NavLink>
                                        <Button
                                            color="primary"
                                            className={`btn-shadow btn-multiple-state ${
                                                loading ? 'show-spinner' : ''
                                            }`}
                                            size="lg"
                                            type='submit'
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
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Card>
            </Colxx>
        </Row>
    );
};

// dispatch : 예전 connect 방식
// const mapStateToProps = ({ authUser }) => {
//     const { loading, error } = authUser;
    
//     return { loading, error };
// };

// export default connect(mapStateToProps, {
//     loginUserAction: loginUser,
// })(Login);

// dispatch : 최신 Hook 방식
export default Login;
