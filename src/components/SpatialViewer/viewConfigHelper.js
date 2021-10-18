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

export const getDatasetInfo = (selectedDataset) => {
    let datasetInfo = '';
    if(selectedDataset["Image Type"]) {
        if(selectedDataset["Data Type"] == "Light Microscopic Whole Slide Images" && selectedDataset["Level"]) {
            datasetInfo = `${selectedDataset["Image Type"]} (${selectedDataset["Level"]})`
        } else {
            datasetInfo = selectedDataset["Image Type"]
        }
    }
    return datasetInfo;
}

export const populateViewConfig = async (viewConfig, selectedDataset) => {
    let stringifiedConfig = JSON.stringify(viewConfig);
    let response = await getFileLink(selectedDataset["Package ID"] + '/' + getDerivedImageName(selectedDataset["Source File"]))
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_NAME>', getDerivedImageName(selectedDataset["Source File"]));
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_URL>', response.data);
    stringifiedConfig = stringifiedConfig.replace('<DATASET_INFO>', getDatasetInfo(selectedDataset));
    return JSON.parse(stringifiedConfig);
}

export const getDerivedImageName = (imageName) => {
    return imageName.split('.')[0] + '-ome.tif'
}

export const getImageTypeTooltipCopy = (imageType) => {
    console.log('imageType:', imageType)
    const availableCopy = {
        "RGB max projection of 8-channel immunofluorescence image volume": "8-channel volume combined into a single maximum projection and converted to RGB color space.",
        "Composite max projection of 8-channel immunofluorescence image volume": "8-channel volume combined into a single maximum projection; composite image consists of 8 channels.",
        "Composite 3D 8-channel immunofluorescence image volume": "3D volume completely represented as a stack of individual, 8-channel images. Every focal plane image and every channel can be independently inspected.",
        "RGB max projection of 2-channel (autofluorescence and second harmonic generation) image volume": "Projection of 3D volume collected prior to labeling; channels cannot be controlled.",
        "CODEX": '',
    };
    
    let copy = availableCopy[imageType];

    if (!copy) {
        copy = '';
    }
    return copy;
}

