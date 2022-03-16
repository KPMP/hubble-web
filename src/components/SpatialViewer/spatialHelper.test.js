import { createHeaderString, compareTableStrings } from './spatialHelper';

describe('createHeaderString', () => {
    it('should return a valid string given a choosen spatial image', () => {
        const selectedImageDataset = {
            "datatype": "Light Microscopic Whole Slide Images",
            "tissuetype": "AKI",
            "redcapid": "55-55555"
        }
        const expectedHeaderString = "Light Microscopic Whole Slide Images for AKI participant 55-55555"
        const headerString = createHeaderString(selectedImageDataset);

        expect(headerString).toEqual(expectedHeaderString);
    });
    it('should return a valid fallback string when data isnt fully present', () => {
        const selectedImageDataset = {
            "datatype": "Light Microscopic Whole Slide Images",
            "tissuetype": "AKI"
        }
        const expectedHeaderString = "Viewing Spatial Data"
        const headerString = createHeaderString(selectedImageDataset);

        expect(headerString).toEqual(expectedHeaderString);
    });
});


describe('compareTableStrings', () => {
    it('should return 0 for a matching b', () => {
        const a = {props: {children: '1'}}
        const b = {props: {children: '1'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return -1 for letter a being smaller than letter b', () => {
        const a = {props: {children: 'a'}}
        const b = {props: {children: 'b'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return 1 for a being bigger than b', () => {
        const a = {props: {children: '1'}}
        const b = {props: {children: '0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return -1 for a being smaller than b', () => {
        const a = {props: {children: '0'}}
        const b = {props: {children: '1'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return 1 for a being bigger than b', () => {
        const a = {props: {children: '1-0'}}
        const b = {props: {children: '0-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return 1 for a being bigger than b, both with -', () => {
        const a = {props: {children: '1-1'}}
        const b = {props: {children: '1-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return -1 for a with extra - being smaller than b', () => {
        const a = {props: {children: '1--1'}}
        const b = {props: {children: '1-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return 1 for a with string data being smaller than b', () => {
        const a = {props: {children: '1-ab-1'}}
        const b = {props: {children: '1-ab-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return 1 for a with string data being smaller than b', () => {
        const a = {props: {children: '1-ab-1'}}
        const b = {props: {children: '1-ab-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return -1 for a with string data being smaller than b', () => {
        const a = {props: {children: '1-ab-1'}}
        const b = {props: {children: '1-ba-1'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should return 1 for a with numeric data being larger than b', () => {
        const a = {props: {children: 2}}
        const b = {props: {children: 1}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)

    })
});