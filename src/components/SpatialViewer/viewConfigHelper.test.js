import { getViewConfig, populateViewConfig} from './viewConfigHelper';
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
    });
});

describe ('populateViewConfig', () => {
    it('should replace all of the placeholder values with the values passed in', () => {
        let selectedDataset = {
            'name': 'imageName.tiff',
            'url': 'http://google.com',
            'description': 'description'
        };
        let result = populateViewConfig(threeDCytometryViewConfig, selectedDataset);
        let resultString = JSON.stringify(result);
        let index = resultString.search('<*>');

        expect(index).toBe(-1);
        expect(result.datasets[0].files[0].options.images[0].name).toEqual('imageName.tiff');
        expect(result.datasets[0].files[0].options.images[0].url).toEqual('http://google.com');
        expect(result.description).toEqual('description');
    });
    it('should handle missing description', () => {
        let selectedDataset = {
            'name': 'imageName.tiff',
            'url': 'http://google.com'
        };
        let result = populateViewConfig(threeDCytometryViewConfig, selectedDataset);
        let resultString = JSON.stringify(result);
        let index = resultString.search('<*>');
        expect(index).toBe(-1);
        expect(result.description).toEqual('');
    });

});