import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import './App.scss';
import MainPage from 'components/MainPage/index';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <MainPage/>
    </Provider>
  );
}

export default App;
