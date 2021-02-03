import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Profile from 'components/Profile';
import { PROFILE } from 'const/path';

const ProfilePrivateRoute = () => {
  const context = useSelector((state) => state);
  return <Route path={`${PROFILE}/:username`} render={() => (context.auth.currentUser === null ? <Redirect to="/" /> : <Profile/>)} />;
};

export default ProfilePrivateRoute;
