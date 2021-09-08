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