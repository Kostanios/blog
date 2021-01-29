import {
  Form, Input, Button,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { REGISTRATION } from '../../const/path';
import { loginThunk } from '../../redux/slices/authSlice';
import styles from './styles.module.scss';

const Login = () => {
  const context = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (context.auth.errors === null && context.auth.currentUser !== null) { history.push('/'); }
  }, [context.auth.errors, context.auth.currentUser]);
  const onFinish = (values) => {
    dispatch(loginThunk(values));
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return <div className={styles.loginContainer}>
    <div className={styles.loginComponent}>
        <header className={styles.header}>Sign In</header>
        <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
        >
            <div className={styles.inputContainer}>
                <span>Email address</span>
                <Input placeholder={'Email address'}/>
            </div>
        </Form.Item>

        <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
        >
            <div className={styles.inputContainer}>
                <span>Password</span>
                <Input.Password placeholder={'Password'}/>
            </div>
        </Form.Item>
        <Form.Item>
            <Button className={styles.loginButton} type="primary" htmlType="submit">
            Login
            </Button>
        </Form.Item>
        </Form>
        <div className={styles.questionContainer}>
          <span className={styles.question}>Don’t have an account?</span><Link to={`${REGISTRATION}`}>Sign Up.</Link>
        </div>
        <div className={styles.errorContainer}>
          <span className={styles.error}>{ !context.auth.errors ? null : 'email or password is invalid'}</span>
        </div>
    </div>
</div>;
};

export default Login;
