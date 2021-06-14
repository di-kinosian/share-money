import "./App.css";
import { Route, Switch, Router, BrowserRouter } from "react-router-dom";
import history from "./config/history";
import HeaderProvider from "./providers/HeaderProvider";
import { Provider } from "react-redux";
import store from "./config/store";
import Home from "./views/Home";
import Balance from "./views/Balance";
import Profile from './views/Profile';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <HeaderProvider>
                    <Switch>
                        <Route exact={true} path={"/"} component={Home} />
                        <Route
                            exact={true}
                            path={"/balance/:balanceId"}
                            component={Balance}
                        />
                        <Route
                            exact={true}
                            path={"/profile"}
                            component={Profile}
                        />
                    </Switch>
                </HeaderProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
