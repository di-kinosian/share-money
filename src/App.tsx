import { Router } from 'react-router-dom';
import history from './config/history';
import HeaderProvider from './providers/HeaderProvider';
import { Provider } from 'react-redux';
import store from './config/store';
import Routes from './routes';
import ConnectionCheckProvider from './providers/ConnectionCheckProvider';
// import VersionModal from './components/VersionModal';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <HeaderProvider>
          <Routes />
          <ConnectionCheckProvider />
        </HeaderProvider>
      </Router>
      {/* <VersionModal></VersionModal> */}
    </Provider>
  );
}

export default App;
