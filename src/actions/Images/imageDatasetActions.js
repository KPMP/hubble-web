import actionNames from '../actionNames'

export const setSelectedImageDataset = (imageDataset) => {
    return {
        type: actionNames.SET_SELECTED_IMAGE_DATASET,
        payload: imageDataset
    }
}