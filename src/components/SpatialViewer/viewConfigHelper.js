import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';

export const getViewConfig = (type) => {
    switch (type) {
        case '3D Cytometry':
            return threeDCytometryViewConfig;
        case 'CODEX':
            return threeDCytometryViewConfig;
        case 'WSI':
            return lmViewConfig;
        default:
            return threeDCytometryViewConfig
    }
};

export const populateViewConfig = (viewConfig, selectedDataset) => {
    let stringifiedConfig = JSON.stringify(viewConfig);

    stringifiedConfig = stringifiedConfig.replace('<IMAGE_NAME>', selectedDataset["Source File"]);
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_URL>',
        process.env.REACT_APP_IMAGE_PATH + selectedDataset["Package ID"] + '/derived/' + getDerivedImageName(selectedDataset["Source File"]));
    stringifiedConfig = stringifiedConfig.replace('<DATASET_INFO>', selectedDataset["Dataset Information"] ? selectedDataset["Dataset Information"]: '');

    return JSON.parse(stringifiedConfig);
}

export const getDerivedImageName = (imageName) => {
    return imageName.split('.')[0] + '-ome.tif'
}