import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import User from 'assets/SVG/User.svg';
import { clearAuthErrors, logOut } from 'redux/slices/authSlice';
import { clearDataErrors } from 'redux/slices/dataSlice';
import {
  REGISTRATION, LOG_IN, PROFILE, ARTICLE_INIT_PAGE,
} from 'const/path';
import { NOT_AUTHORIZET } from 'const/errors';
import styles from './styles.module.scss';

const Header = () => {
  const context = useSelector((state) => state);
  const dispatch = useDispatch();
  return <div className={styles.headerComponent}>
    <Link onClick={() => { dispatch(clearAuthErrors()); dispatch(clearDataErrors()); }} to='/'><header className={styles.blog}>Realworld Blog</header></Link>
    <div className={styles.buttonGroup}>
        {
        context.auth.currentUser === null
          ? <>
              { context.data.errors === NOT_AUTHORIZET ? <Alert className={styles.alert} message="Log in to like and leave the article" type="error" showIcon /> : null}
              <Link to={`${LOG_IN}`}>
                <button
                  onClick={() => { dispatch(clearAuthErrors()); dispatch(clearDataErrors()); }}
                  className={styles.inButton}>
                    Sign In
                </button>
              </Link>
              <Link to={`${REGISTRATION}`}>
                <button
                  onClick={() => { dispatch(clearDataErrors()); dispatch(clearAuthErrors()); }}
                  className={styles.upButton}>
                    Sign Up
                  </button>
              </Link>
            </>
          : <>
        <Link
          to={`${ARTICLE_INIT_PAGE}/${context.auth.currentUser.username}`}
        >
            <button className={styles.createButton}>Create article</button>
        </Link>
        <Link
          onClick={() => { dispatch(clearDataErrors()); dispatch(clearAuthErrors()); }}
          className={styles.profileLink}
          to={`${PROFILE}/${context.auth.currentUser.username}`}>
          <div className={styles.profileContainer}>
            <span className={styles.author}>{context.auth.currentUser.username}</span>
            <img className={styles.avatar}
              src={context.auth.currentUser.image === null || context.auth.currentUser.image === ''
                ? User
                : context.auth.currentUser.image}
                alt=''/>
          </div>
        </Link>
        <button
          onClick={() => {
            dispatch(logOut());
          }}
          className={styles.logoutButton}>Log Out</button>
        </>}
    </div>
</div>;
};

export default Header;
