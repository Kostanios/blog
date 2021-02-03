/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { CacheSwitch } from 'react-router-cache-route';

import Header from 'components/Header';
import Collection from 'components/Collection';
import ArticleView from 'components/ArticleView';
import ProfilePrivateRoute from 'routes/ProfilePrivateRoute';
import ArticleInitPagePrivateRoute from 'routes/ArticleInitPagePrivateRoute';
import Regist from 'components/Regist';
import Login from 'components/Login';
import { getUserThunk } from 'redux/slices/authSlice';
import {
  ARTICLE, REGISTRATION, LOG_IN,
} from 'const/path';
import styles from './styles.module.scss';

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserThunk());
  }, []);
  return <div className={styles.mainPage}>
    <Router>
    <Header/>
        <Switch>
            <Route exact path={'/'} component={Collection} />
            <Route path={`${ARTICLE}/:slug`} component={ArticleView} />
            <Route path={`${REGISTRATION}`} component={Regist} />
            <Route path={`${LOG_IN}`} component={Login}/>
            <ProfilePrivateRoute/>
            <ArticleInitPagePrivateRoute/>
        </Switch>
    </Router>
</div>;
};

export default MainPage;
