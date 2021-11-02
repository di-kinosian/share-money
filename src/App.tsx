import { Router } from 'react-router-dom';
import history from './config/history';
import HeaderProvider from './providers/HeaderProvider';
import { Provider } from 'react-redux';
import store from './config/store';
import Routes from './routes';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <HeaderProvider>
                    <Routes />
                </HeaderProvider>
            </Router>
        </Provider>
    );
}

export default App;
