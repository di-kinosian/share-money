import { Router } from 'react-router-dom';
import history from './config/history';
import HeaderProvider from './providers/HeaderProvider';
import { Provider } from 'react-redux';
import store from './config/store';
import Routes from './routes';
import Timeline from './components/Timeline';
import { useCallback } from 'react-router/node_modules/@types/react';

function App() {
    const onDateChange = useCallback((date) =>{
        console.log(date)
    },[])
    return (
        <Provider store={store}>
            <Router history={history}>
                <HeaderProvider>
                    <Timeline blockWidth={150} onChange={onDateChange} />
                    <Routes />
                </HeaderProvider>
            </Router>
            {/* <VersionModal></VersionModal> */}
        </Provider>
    );
}

export default App;
