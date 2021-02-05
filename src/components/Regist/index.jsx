/* eslint-disable prefer-promise-reject-errors */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';

import { registrationThunk, clearAuthErrors } from 'redux/slices/authSlice';
import { clearDataErrors } from 'redux/slices/dataSlice';
import { LOG_IN } from 'const/path';
import styles from './styles.module.scss';

const Regist = () => {
  const history = useHistory();
  const context = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [serverError, setServerError] = useState(false);
  useEffect(() => {
    forceUpdate({});
  }, []);
  useEffect(() => {
    if (context.auth.errors === null && context.auth.currentUser !== null) { history.push('/'); }
    if (context.auth.errors !== null) {
      setServerError(true);
    }
  }, [context.auth.errors, context.auth.currentUser]);
  const onFinish = (values) => {
    if (!serverError && !context.auth.isLoading) {
      dispatch(registrationThunk(values));
    }
    // console.log('Finish:', values);
  };
  return <div className={styles.registrContainer}>
    <div className={styles.registrComponent}>
    <header className={styles.header}>Create new account</header>
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
          {
            min: 3,
            message: 'Username must be at least 3 characters!',
          },
          {
            max: 20,
            message: 'Username must be maximum 20 characters!',
          },
        ]}
      >
        <div className={styles.inputContainer}>
            <label htmlFor='user' className={styles.inputLabel}>username</label>
            <Input readOnly onFocus={(e) => { e.target.removeAttribute('readonly'); }} type='text' id='user' onChange={() => { setServerError(false); }} placeholder={'Username'}/>
        </div>
      </Form.Item>
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
          <label htmlFor='email'>E-mail</label>
          <Input readOnly onFocus={(e) => { e.target.removeAttribute('readonly'); }} id='email' type='email' onChange={() => { setServerError(false); }} placeholder={'E-mail'}/>
        </div>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 6,
            message: 'Password must be at least 6 characters!',
          },
          {
            max: 40,
            message: 'Password must be maximum 40 characters!',
          },
        ]}
        hasFeedback
      >
        <div className={styles.inputContainer}>
          <label htmlFor='password' className={styles.inputLabel}>Password</label>
          <Input.Password readOnly onFocus={(e) => { e.target.removeAttribute('readonly'); }} id='password' onChange={() => { setServerError(false); }} placeholder={'Password'}/>
        </div>
      </Form.Item>
      <Form.Item
        name="Confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('passwords do not match!');
            },
          }),
        ]}
      >
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Confirm</label>
            <Input.Password readOnly onFocus={(e) => { e.target.removeAttribute('readonly'); }} placeholder={'Confirm Password'}/>
        </div>
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Should accept agreement')),
          },
        ]}
      >
        <div className={styles.checkboxInput}>
            <Checkbox/>
            <span className={styles.checkboxSpan}>
                I agree to the processing of my personal information
            </span>
        </div>
      </Form.Item>
      <Form.Item>
        <div className={styles.regButtonContainer}>
            <Button className={!context.auth.isLoading ? styles.createButton : styles.disableCreateButton} type="primary" htmlType="submit">
             Create
            </Button>
        </div>
      </Form.Item>
    </Form>
    <div className={styles.questionContainer}>
      <span className={styles.question}>Already have an account?</span>
      <Link onClick={() => { dispatch(clearDataErrors()); dispatch(clearAuthErrors()); }} to={`${LOG_IN}`}>Sign In.</Link>
    </div>
    <div className={styles.errorContainer}>
          <span className={styles.error}>{ !context.auth.errors ? null : 'account with this email or usename exists'}</span>
    </div>
  </div>
</div>;
};

export default Regist;
