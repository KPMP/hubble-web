import React, { Component } from 'react';
import { NavBar } from 'kpmp-common-components';
import loadedState from './initialState';
import { configureStore } from '@reduxjs/toolkit';
import { resetStateReducer } from './resetStateReducer';
import {selectedImageDataset, tableSettings} from "./components/SpatialViewer/imageDatasetReducer";
import {summaryDatasets, clinicalDatasets} from "./components/SpatialViewer/clinicalDatasetReducer";
import {experimentalDataCounts} from "./components/SpatialViewer/experimentalDataCountReducer";
import { Provider } from 'react-redux';
import ReactGA from 'react-ga4';
import { createBrowserHistory } from 'history';
import { Route, Routes, BrowserRouter } from 'react-router';
import ErrorBoundaryContainer from './components/Error/ErrorBoundaryContainer';
import Oops from './components/Error/Oops';
import NotFoundPage from './components/Error/NotFoundPage';
import ImageDatasetListContainer from "./components/SpatialViewer/ImageDatasetListContainer";
import SpatialViewerContainer from "./components/SpatialViewer/SpatialViewerContainer";
import packageJson from '../package.json';
// import {ThemeProvider, createMuiTheme, makeSytles} from '@material-ui/core/styles';
import {ApolloProvider} from "@apollo/client";

// const theme = createMuiTheme();
// const useStyles = makeStyles((theme) => {
//     root: {

//     }
// });
const cacheStore = window.sessionStorage.getItem('hubble-redux-store');
const initialState = cacheStore ? JSON.parse(cacheStore) : loadedState;
export const store = configureStore({
  reducer: {
    resetStateReducer: resetStateReducer,
    selectedImageDataset: selectedImageDataset,
    tableSettings: tableSettings,
    summaryDatasets: summaryDatasets,
    clinicalDatasets: clinicalDatasets,
    experimentalDataCounts: experimentalDataCounts
  },
  initialState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});
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
        <ApolloProvider>
            {/* <ThemeProvider theme={theme} > */}
                <BrowserRouter history={history} basename={packageJson.baseURL}>
                    <ErrorBoundaryContainer>
                    <NavBar app='atlas' comparatorOn={process.env.REACT_APP_COMPARATOR_ON} />
                    <Routes>
                      <Route path="/" element={<ImageDatasetListContainer />} />
                      <Route path="/view" element={<SpatialViewerContainer />} />
                      <Route path="/oops" element={<Oops />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    </ErrorBoundaryContainer>
                </BrowserRouter>
            {/* </ThemeProvider> */}
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
