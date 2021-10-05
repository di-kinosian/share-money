import { createStore, applyMiddleware } from 'redux';
import { rootReducer, saga  } from '../modules/root';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(saga)

  return store;
};

export default configureStore();
