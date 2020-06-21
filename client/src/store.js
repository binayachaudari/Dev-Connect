import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [ReduxThunk];
const composeEnhancers = composeWithDevTools({
  name: `Redux`,
  realtime: true,
  trace: true,
  traceLimit: 25
});
let store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
/**
 * Disable redux dev tools in production
 */
if (process.env.NODE_ENV !== 'production') {
  store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
}

export default store;
