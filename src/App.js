import "./App.css";
import { Route, Switch, Router } from "react-router-dom";
import history from "./config/history";
import HeaderProvider from "./providers/HeaderProvider";
import { Provider } from "react-redux";
import store from "./config/store";
import Root from "./views/Root";
import Balance from "./views/Balance";

function App(props) {
    return (
        <Provider store={store}>
            <Router history={history}>
                <HeaderProvider>
                    <Switch>
                        <Route exact={true} path={"/"} component={Root} />
                        <Route
                            exact={true}
                            path={"/balance/:balanceId"}
                            component={Balance}
                        />
                    </Switch>
                </HeaderProvider>
            </Router>
        </Provider>

        // <div className="transaction-field">
        //     <div className="text">{props.label}</div>
        //     {props.children}
        // </div>
    );
}

export default App;
