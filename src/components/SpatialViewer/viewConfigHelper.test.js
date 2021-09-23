import { getViewConfig, populateViewConfig, getDatasetInfo } from './viewConfigHelper';
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
            'Source File': 'imageName.tiff',
            'Dataset Information': 'description'
        };
        let result = populateViewConfig(threeDCytometryViewConfig, selectedDataset);
        let resultString = JSON.stringify(result);
        let index = resultString.search('<*>');

        expect(index).toBe(-1);
        expect(result.datasets[0].files[0].options.images[0].name).toEqual('imageName.tiff');
        expect(result.datasets[0].files[0].options.images[0].url).toEqual('imageName.tiff');
        expect(result.description).toEqual('description');
    });
    it('should handle missing description', () => {
        let selectedDataset = {
            'Source File': 'imageName.tiff',
        };
        let result = populateViewConfig(threeDCytometryViewConfig, selectedDataset);
        let resultString = JSON.stringify(result);
        let index = resultString.search('<*>');
        expect(index).toBe(-1);
        expect(result.description).toEqual('');
    });

});

describe ('getDatasetInfo', () => {
    it('should return whole slide image string with level included', () => {
        const selectedDataset = {
            "Data Type": "Light Microscopic Whole Slide Images",
            "Image Type": "Jones' Methenamine Silver (SIL) histochemical stain",
            "Level": "L12"
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "Jones' Methenamine Silver (SIL) histochemical stain L12";

        expect(datasetInfo).toBe(expectedInfo);
    });
    it('should return whole slide image string without level included', () => {
        const selectedDataset = {
            "Data Type": "Light Microscopic Whole Slide Images",
            "Image Type": "Jones' Methenamine Silver (SIL) histochemical stain",
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "Jones' Methenamine Silver (SIL) histochemical stain";

        expect(datasetInfo).toBe(expectedInfo);
    });
    it('should return a Label-free auto-fluorescent image', () => {
        const selectedDataset = {
            "Data Type": "Label-free auto-fluorescent image",
            "Image Type": "Jones' Methenamine Silver (SIL) histochemical stain",
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "Jones' Methenamine Silver (SIL) histochemical stain";

        expect(datasetInfo).toBe(expectedInfo);
    });
    it('should return an empty string if image type not present for 3d Cyto', () => {
        const selectedDataset = {
            "Data Type": "Label-free auto-fluorescent image",
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "";

        expect(datasetInfo).toBe(expectedInfo);
    });
    it('should return an empty string if image type not present for Whole slide image', () => {
        const selectedDataset = {
            "Data Type": "Light Microscopic Whole Slide Images",
          }

        let datasetInfo = getDatasetInfo(selectedDataset);
        let expectedInfo = "";

        expect(datasetInfo).toBe(expectedInfo);
    });
})