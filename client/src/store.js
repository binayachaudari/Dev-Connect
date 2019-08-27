import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk'
import rootReducer from './reducers';

const initialState = {};

const middleware = [ReduxThunk];
const composeEnhancers = composeWithDevTools({
  name: `Redux`,
  realtime: true,
  trace: true,
  traceLimit: 25
});
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store;