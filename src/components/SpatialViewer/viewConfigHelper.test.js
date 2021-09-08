import {getViewConfig} from './viewConfigHelper';
import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';

describe('getViewConfig', () => {
    it('should return 3dCyto config when 3dcyto', () => {
        let config = getViewConfig('3dc');
        let expectedConfig = threeDCytometryViewConfig;

        expect(config).toEqual(expectedConfig);

    });
    it ('should return light microscopy config when lm', () => {
        let config = getViewConfig('lm');
        let expectedConfig = lmViewConfig;

        expect(config).toEqual(expectedConfig);
    });
    it ('should return 3dcyto config when codex', () => {
        let config = getViewConfig('codex');
        let expectedConfig = threeDCytometryViewConfig;

        expect(config).toEqual(expectedConfig);
    });
    it ('should default to 3dcyto when unknown type', () => {
        let config = getViewConfig('garbage');
        let expectedConfig = threeDCytometryViewConfig;

        expect(config).toEqual(expectedConfig);
    })

});