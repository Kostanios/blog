/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { CacheSwitch } from 'react-router-cache-route';

import styles from './styles.module.scss';
import Header from '../Header';
import Collection from '../Collection';
import ArticleView from '../ArticleView';
import Regist from '../Regist';
import Login from '../Login';
import Profile from '../PROFILE';
import ArticleInitPage from '../ArticleInitPage';
import {
  ARTICLE, REGISTRATION, LOG_IN, PROFILE, ARTICLE_INIT_PAGE,
} from '../../const/path';
import { getUserThunk } from '../../redux/slices/authSlice';

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
            <Route path={`${PROFILE}/:username`} component={Profile}/>
            <Route path={`${ARTICLE_INIT_PAGE}/:username`} component={ArticleInitPage}/>
        </Switch>
    </Router>
</div>;
};

export default MainPage;
