import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';

export const getViewConfig = (type) => {
    switch (type) {
        case '3dc':
            return threeDCytometryViewConfig;
        case 'codex':
            return threeDCytometryViewConfig;
        case 'lm':
            return lmViewConfig;
        default:
            return threeDCytometryViewConfig
    }
};

export const populateViewConfig = (viewConfig, selectedDataset) => {
    let stringifiedConfig = JSON.stringify(viewConfig);

    stringifiedConfig = stringifiedConfig.replace('<IMAGE_NAME>', selectedDataset.name);
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_URL>', selectedDataset.url);
    stringifiedConfig = stringifiedConfig.replace('<DATASET_INFO>', selectedDataset.description ? selectedDataset.description: '');

    return JSON.parse(stringifiedConfig);
}