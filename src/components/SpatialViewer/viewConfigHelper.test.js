import { getViewConfig, populateViewConfig} from './viewConfigHelper';
import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';

describe('getViewConfig', () => {
    it('should return 3dCyto config when 3D Cytometry', () => {
        let config = getViewConfig('3D Cytometry');
        let expectedConfig = threeDCytometryViewConfig;

        expect(config).toEqual(expectedConfig);

    });
    it ('should return light microscopy config when WSI', () => {
        let config = getViewConfig('WSI');
        let expectedConfig = lmViewConfig;

        expect(config).toEqual(expectedConfig);
    });
    it ('should return 3dcyto config when CODEX', () => {
        let config = getViewConfig('CODEX');
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
            'imageName': 'imageName.tiff',
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
            'imageName': 'imageName.tiff',
            'url': 'http://google.com'
        };
        let result = populateViewConfig(threeDCytometryViewConfig, selectedDataset);
        let resultString = JSON.stringify(result);
        let index = resultString.search('<*>');
        expect(index).toBe(-1);
        expect(result.description).toEqual('');
    });

});