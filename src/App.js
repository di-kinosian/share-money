import './App.css';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import history from './config/history';
import HeaderProvider from './providers/HeaderProvider';
import { Provider } from 'react-redux';
import store from './config/store';
import Home from './views/Home';
import Balance from './views/Balance';
import Profile from './views/Profile';
import AuthModals from './components/AuthModals';
import BalanceNew from './views/BalanceNew';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <AuthModals />

                <HeaderProvider>
                    <Switch>
                        <Route exact={true} path={'/'}>
                            <Home />
                        </Route>
                        <Route path={'/balance/:balanceId'}>
                            <BalanceNew />
                        </Route>
                        <Route path={'/special'}>
                            <Balance />
                        </Route>
                        <Route
                            exact={true}
                            path={'/profile'}
                            component={Profile}
                        />
                    </Switch>
                </HeaderProvider>
            </Router>
        </Provider>
    );
}

export default App;
