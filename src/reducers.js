import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedImageDataset, tableSettings } from "./components/SpatialViewer/imageDatasetReducer";


const appReducer = combineReducers({
  resetStateReducer,
  selectedImageDataset,
  tableSettings
});

export default appReducer;
