import {connect} from "react-redux";
import SpatialViewer from "./SpatialViewer";
import { withRouter } from 'react-router';

const mapStateToProps = (state, props) =>
    ({
        selectedImageDataset: state.selectedImageDataset
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpatialViewer));