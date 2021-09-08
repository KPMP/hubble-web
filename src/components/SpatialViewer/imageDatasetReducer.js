import actionNames from "../../actions/actionNames";

export const selectedImageDataset = ( state = {}, action ) => {
    switch(action.type) {
        case actionNames.SET_SELECTED_IMAGE_DATASET:
            return action.payload;
        default:
            return state;
    }
};