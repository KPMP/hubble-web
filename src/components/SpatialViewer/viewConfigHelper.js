import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';
import { getFileLink } from "../../helpers/Api";

export const getViewConfig = (type) => {
    switch (type) {
        case '3D Tissue Imaging and Cytometry':
            return threeDCytometryViewConfig;
        case 'CODEX':
            return threeDCytometryViewConfig;
        case 'Light Microscopic Whole Slide Images':
            return lmViewConfig;
        default:
            return threeDCytometryViewConfig
    }
};

export const populateViewConfig = async (viewConfig, selectedDataset) => {
    let stringifiedConfig = JSON.stringify(viewConfig);
    let response = await getFileLink(selectedDataset["Package ID"] + '/' + getDerivedImageName(selectedDataset["Source File"]))
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_NAME>', getDerivedImageName(selectedDataset["Source File"]));
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_URL>', response.data);
    stringifiedConfig = stringifiedConfig.replace('<DATASET_INFO>', selectedDataset["Dataset Information"] ? selectedDataset["Dataset Information"] : '');
    return JSON.parse(stringifiedConfig);
}

export const getDerivedImageName = (imageName) => {
    return imageName.split('.')[0] + '-ome.tif'
}