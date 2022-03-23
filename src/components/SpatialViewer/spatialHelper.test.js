import { createHeaderString, compareTableStrings, includesLetter } from './spatialHelper';

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


describe('includesLetter', () => {
    it('should return true string 123abc123', () => {
        const result = includesLetter('123abc123')
        const expected = true
        expect(result).toEqual(expected)
    }),
    it('should return true string 123abc', () => {
        const result = includesLetter('123abc')
        const expected = true
        expect(result).toEqual(expected)
    }),
    it('should return true string abc', () => {
        const result = includesLetter('abc')
        const expected = true
        expect(result).toEqual(expected)
    }),
    it('should return false string 123', () => {
        const result = includesLetter('123')
        const expected = false
        expect(result).toEqual(expected)
    })
});

describe('compareTableStrings', () => {
    it('should be sorted when strings a equals b', () => {
        const a = {props: {children: '1'}}
        const b = {props: {children: '1'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when numbers a equals b', () => {
        const a = {props: {children: 10}}
        const b = {props: {children: 10}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when a equals b with dashed numbers and letters', () => {
        const a = {props: {children: '100-200-abc'}}
        const b = {props: {children: '100-200-abc'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should be sorted when a equals b with dashed letters and numbers', () => {
        const a = {props: {children: 'abc-100-200'}}
        const b = {props: {children: 'abc-100-200'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 0
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when letters a and b are compared', () => {
        const a = {props: {children: 'a'}}
        const b = {props: {children: 'b'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort b before a when letters b and a are compared', () => {
        const a = {props: {children: 'b'}}
        const b = {props: {children: 'a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when stringed numbers 1 and 0 are compared', () => {
        const a = {props: {children: '1'}}
        const b = {props: {children: '0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    })
    it('should sort b before a when stringed numbers 0 and 1 are compared', () => {
        const a = {props: {children: '0'}}
        const b = {props: {children: '1'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when strings 1-0 and 0-0 are compared', () => {
        const a = {props: {children: '1-0'}}
        const b = {props: {children: '0-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when strings 1-1 and 1-0 are compared', () => {
        const a = {props: {children: '1-1'}}
        const b = {props: {children: '1-0'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult);
    }),
    it('should sort a before b when integer numbers 2 and 1 are compared', () => {
        const a = {props: {children: 2}}
        const b = {props: {children: 1}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when integer numbers 1 and 2 are compared', () => {
        const a = {props: {children: 1}}
        const b = {props: {children: 2}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-10034 and 32-2 are compared', () => {
        const a = {props: {children: '32-10034'}}
        const b = {props: {children: '32-2'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-2 and 32-10034 are compared', () => {
        const a = {props: {children: '32-2'}}
        const b = {props: {children: '32-10034'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-10034a and 32-2b are compared', () => {
        const a = {props: {children: '32-10034a'}}
        const b = {props: {children: '32-2b'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-2b and 32-10034a are compared', () => {
        const a = {props: {children: '32-2b'}}
        const b = {props: {children: '32-10034a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-10034b and 32-200000a are compared', () => {
        const a = {props: {children: '32-10034b'}}
        const b = {props: {children: '32-200000a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-10034 and 32-20034 are compared', () => {
        const a = {props: {children: '32-10034'}}
        const b = {props: {children: '32-20034'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-aa and 32-bb are compared', () => {
        const a = {props: {children: '32-aa'}}
        const b = {props: {children: '32-bb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-bb and 32-aa are compared', () => {
        const a = {props: {children: '32-bb'}}
        const b = {props: {children: '32-aa'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-ab and 32-aa are compared', () => {
        const a = {props: {children: '32-ab'}}
        const b = {props: {children: '32-aa'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-aaa and 32-aaa are compared', () => {
        const a = {props: {children: '32-aaa'}}
        const b = {props: {children: '32-aab'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-aaa and 32-aab are compared', () => {
        const a = {props: {children: '32-aaa'}}
        const b = {props: {children: '32-aab'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before a when 32-aaa and 32-aab are compared', () => {
        const a = {props: {children: '32-aabb'}}
        const b = {props: {children: '32-aaab'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-100aa and 32-100bb are compared', () => {
        const a = {props: {children: '32-100aa'}}
        const b = {props: {children: '32-100bb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-200aa and 32-100bb are compared', () => {
        const a = {props: {children: '32-200aa'}}
        const b = {props: {children: '32-100bb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort b before b when 32-1a and 32-1bb are compared', () => {
        const a = {props: {children: '32-1a'}}
        const b = {props: {children: '32-1bb'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-100b and 32-2a are compared', () => {
        const a = {props: {children: '32-100b'}}
        const b = {props: {children: '32-2a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-100b and 32-2a are compared', () => {
        const a = {props: {children: 'a32-100b'}}
        const b = {props: {children: 'a32-2a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-100b and 32-2a are compared', () => {
        const a = {props: {children: 'a32-100b'}}
        const b = {props: {children: 'b32-2a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = -1
        expect(compareResult).toEqual(expectedresult)
    }),
    it('should sort a before b when 32-100b and 32-2a are compared', () => {
        const a = {props: {children: 'b32-100b'}}
        const b = {props: {children: 'a32-2a'}}

        const compareResult = compareTableStrings(a,b);

        const expectedresult = 1
        expect(compareResult).toEqual(expectedresult)
    })
});
