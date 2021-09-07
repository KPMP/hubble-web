import {connect} from "react-redux";
import SpatialViewer from "./SpatialViewer";

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: this.state.selectedImageDataset
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(SpatialViewer);