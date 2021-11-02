import { createHeaderString } from './spatialHelper';

describe('createHeaderString', () => {
    it('should return a valid string given a choosen spatial image', () => {
        const selectedImageDataset = {
            "Data Type": "Light Microscopic Whole Slide Images",
            "Tissue Type": "AKI",
            "Participant ID": "55-55555"
        }
        const expectedHeaderString = "Light Microscopic Whole Slide Images for AKI participant 55-55555"
        const headerString = createHeaderString(selectedImageDataset);

        expect(headerString).toEqual(expectedHeaderString);
    });
    it('should return a valid fallback string when data isnt fully present', () => {
        const selectedImageDataset = {
            "Data Type": "Light Microscopic Whole Slide Images",
            "Tissue Type": "AKI"
        }
        const expectedHeaderString = "Viewing Spatial Data"
        const headerString = createHeaderString(selectedImageDataset);

        expect(headerString).toEqual(expectedHeaderString);
    });
});