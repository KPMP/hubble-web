import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedImageDataset } from "./components/SpatialViewer/imageDatasetReducer";


const appReducer = combineReducers({
  resetStateReducer,
  selectedImageDataset
});

export default appReducer;
