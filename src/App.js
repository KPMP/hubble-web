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
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider } from "@elastic/react-search-ui";

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

const connector = new AppSearchAPIConnector({
  searchKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: "spatial-viewer",
  endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT,
  cacheResponses: false
})

const searchConfig = {
  apiConnector: connector,
  searchQuery: {
      disjunctiveFacets: [
        "sex", 
        "age", 
        "redcapid", 
        "enrollmentcategory", 
        "imagetype", 
        "datatype", 
        "configtype", 
        "level", 
        "releaseversion",
        "race",
        "proteinuria",
        "hypertensionhistory",
        "hypertensionduration",
        "onraasblockade",
        "diabetesduration",
        "diabeteshistory",
        "kdigostage",
        "a1c",
        "albuminuria",
        "baselineegfr",
        "primaryadjudicatedcategory",
        ],
      facets: {
        sex: { type: "value", sort: {"value": "asc"}, size: 100},
        age: { type: "value", sort: {"value": "asc"}, size: 100},
        redcapid: { type: "value", sort: {"value": "asc"}, size: 500 },
        enrollmentcategory: { type: "value", sort: {"value": "asc"}, size: 100},
        imagetype: { type: "value", sort: {"value": "asc"}, size: 100},
        datatype: { type: "value", sort: {"value": "asc"}, size: 100 },
        configtype: { type: "value", sort: {"value": "asc"}, size: 100},
        level: { type: "value", sort: {"value": "asc"}, size: 100},
        releaseversion: {type: "value", sort: {"value": "asc"}, size: 250},
        race: {type: "value", sort: {"value": "asc"}, size: 250},
        proteinuria: {type: "value", sort: {"value": "asc"}, size: 250},
        hypertensionhistory: {type: "value", sort: {"value": "asc"}, size: 250},
        hypertensionduration: {type: "value", sort: {"value": "asc"}, size: 250},
        onraasblockade:{type: "value", sort: {"value": "asc"}, size: 250},
        diabetesduration: {type: "value", sort: {"value": "asc"}, size: 250},
        diabeteshistory: {type: "value", sort: {"value": "asc"}, size: 250},
        kdigostage: {type: "value", sort: {"value": "asc"}, size: 250},
        a1c: {type: "value", sort: {"value": "asc"}, size: 250},
        albuminuria: {type: "value", sort: {"value": "asc"}, size: 250},
        baselineegfr: {type: "value", sort: {"value": "asc"}, size: 250},
        primaryadjudicatedcategory: {type: "value", sort: {"value": "asc"}, size: 250},
      }
  },
  initialState: {
    resultsPerPage: 20,
    current: 1
  },
  trackUrlState: true,
  alwaysSearchOnInitialLoad: true
}

class App extends Component {
  componentWillMount() {
    logPageView(window.location, '');
  }

  render() {
    return (
      <Provider store={store}>
        <SearchProvider config={searchConfig}>
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
        </SearchProvider>
      </Provider>
    );
  }
}

export default App;
