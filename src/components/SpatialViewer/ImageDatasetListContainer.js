import {connect} from "react-redux";
import ImageDatasetList from "./ImageDatasetList";
import { withRouter } from 'react-router';
import {setSelectedImageDataset} from "../../actions/Images/imageDatasetActions";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(selectedImageDataset) {
             dispatch(setSelectedImageDataset(selectedImageDataset));
             dispatch((dispatch) => props.history.push("/spatial-viewer/vitessce"));
         }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageDatasetList))