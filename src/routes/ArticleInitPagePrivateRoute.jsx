import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ArticleInitPage from 'components/ArticleInitPage';
import { ARTICLE_INIT_PAGE } from 'const/path';

const ArticleInitPagePrivateRoute = () => {
  const context = useSelector((state) => state);
  return <Route path={`${ARTICLE_INIT_PAGE}/:username`} render={() => (context.auth.currentUser === null ? <Redirect to="/" /> : <ArticleInitPage/>)} />;
};

export default ArticleInitPagePrivateRoute;
