/* eslint-disable prefer-promise-reject-errors */
import {
  Form,
  Input,
  Button,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { updateUserThunk } from '../../redux/slices/authSlice';
import styles from './styles.module.scss';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const context = useSelector((state) => state);
  const [usename, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [urlConfirm, setUrlConfirm] = useState(null);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);
  useEffect(() => {
    if (context.auth.currentUser) {
      setUsername(context.auth.currentUser.username);
      setEmail(context.auth.currentUser.email);
      setUrl(context.auth.currentUser.image ? context.auth.currentUser.image : '');
    }
  }, [context.auth.currentUser]);
  const onFinish = (values) => {
    dispatch(updateUserThunk(values)).then(() => { if (context.auth.errors === null) { history.push('/'); } });
    console.log('Finish:', values);
  };
  const onChangeUrl = (event) => {
    if (event.target.value === '') {
      setUrlConfirm(null);
    } else {
      setUrlConfirm('validating');
    }
    setUrl(event.target.value);
  };
  return context.auth.currentUser ? <div className={styles.container}>
    <div className={styles.profileComponent}>
      <header className={styles.header}>Edit Profile</header>
      <Form
      className={styles.form}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      >
      <Form.Item
        initialValue={context.auth.currentUser.username}
        name="username"
        rules={[
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
            <label className={styles.inputLabel}>Username</label>
            <Input
              value={usename}
              onChange={(event) => { setUsername(event.target.value); }}
              placeholder={'Username'}
            />
        </div>
      </Form.Item>
      <Form.Item
        initialValue={context.auth.currentUser.email}
        validateFirst
        name="email"
         rules={[
           {
             required: true,
             message: 'Please input your E-mail!',
           },
           {
             type: 'email',
             message: 'The input is not valid E-mail!',
           },
         ]}
      >
        <div className={styles.inputContainer}>
          <label>Email address</label>
          <Input
           value={email}
           onChange={(event) => { setEmail(event.target.value); }}
           placeholder={'E-mail'}/>
        </div>
      </Form.Item>
      <Form.Item
        initialValue={undefined}
        name="password"
        rules={[
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
          <label className={styles.inputLabel}>New password</label>
          <Input
           value={`${password}`}
           autoComplete='false'
           onChange={(event) => { setPassword(event.target.value); }}
           placeholder={'Password'}/>
        </div>
      </Form.Item>
      <Form.Item
        initialValue={context.auth.currentUser.image}
        name="image"
        dependencies={['password']}
        hasFeedback
        validateTrigger={['onLoad', 'onChange', 'onError']}
        validateStatus={
          urlConfirm
        }
        rules={[
          {
            validator: (_, value) => {
              console.log(value);
              if (urlConfirm === 'success' || urlConfirm === null) {
                return Promise.resolve();
              }
              return Promise.reject(urlConfirm);
            },
          },
        ]}
      >
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Avatar image (url)</label>
            <img
              onError={(event) => { if (event.target.value !== '') { setUrlConfirm('error'); } }}
              onLoad={() => { setUrlConfirm('success'); }}
              className={styles.img} src={url || null} alt=''/>
            <Input
              src={url || null}
              value={url}
              onChange={(event) => {
                onChangeUrl(event);
              }}
              placeholder={'Avatar image'}/>
        </div>
      </Form.Item>
      <Form.Item>
        <div className={styles.saveButtonContainer}>
            <Button className={styles.saveButton} type="primary" htmlType="submit">
             Save
            </Button>
        </div>
      </Form.Item>
    </Form>
    </div>
</div> : null;
};

export default Profile;
