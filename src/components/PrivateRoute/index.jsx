import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const context = useSelector((state) => state);
  return (
      <Route
        {...rest}
        render={() => (context.auth.currentUser ? (
          children
        ) : (
            <Redirect
              to="/"
            />
        ))
        }
      />
  );
};

export default PrivateRoute;
