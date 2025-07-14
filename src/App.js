import React, { Component } from 'react';
import { NavBar } from 'kpmp-common-components';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga4';
import { createBrowserHistory } from 'history';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ErrorBoundaryContainer from './components/Error/ErrorBoundaryContainer';
import Oops from './components/Error/Oops';
import NotFoundPage from './components/Error/NotFoundPage';
import ImageDatasetListContainer from "./components/SpatialViewer/ImageDatasetListContainer";
import SpatialViewerContainer from "./components/SpatialViewer/SpatialViewerContainer";
import packageJson from '../package.json';

const cacheStore = window.sessionStorage.getItem('hubble-redux-store');
const initialState = cacheStore ? JSON.parse(cacheStore) : loadedState;
export const store = applyMiddleware(thunk)(createStore)(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const saveState = () => {
  window.sessionStorage.setItem(
    'hubble-redux-store',
    JSON.stringify(store.getState())
  );
};

// *** Get a new tracking Id and add it here *** //
const GA_TRACKING_ID = 'G-64W6E37TQB';

ReactGA.initialize(GA_TRACKING_ID,{ testMode: process.env.NODE_ENV === 'test' ? true : false });
function logPageView(location, action) {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
}
const history = createBrowserHistory();
history.listen((location, action) => {
  logPageView(location, action);
});

store.subscribe(function () {
  console.log(store.getState());
});

store.subscribe(saveState);

class App extends Component {
  componentWillMount() {
    logPageView(window.location, '');
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history} basename={packageJson.baseURL}>
          <ErrorBoundaryContainer>
            <NavBar app='atlas' />
            <Switch>
              <Route exact path="/" component={ImageDatasetListContainer} store={store} />
              <Route exact path="/view" component={SpatialViewerContainer} store={store} />
              <Route exact path="/oops" component={Oops} />
              <Route path='*' component={NotFoundPage} />
            </Switch>
          </ErrorBoundaryContainer>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
