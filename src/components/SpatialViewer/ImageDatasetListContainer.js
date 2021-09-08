import {connect} from "react-redux";
import ImageDatasetList from "./ImageDatasetList";
import {setSelectedImageDataset} from "../../actions/Images/imageDatasetActions";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
        setSelectedImageDataset(imageTray) {
             dispatch(setSelectedImageDataset(imageTray))
         }
    });

export default connect(mapStateToProps, mapDispatchToProps)(ImageDatasetList)