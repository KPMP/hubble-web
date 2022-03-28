export const createHeaderString = (selectedImageDataset) => {

    const dataType = selectedImageDataset["datatype"]
    const tissueType = selectedImageDataset["tissuetype"]
    const spectracksampleid = selectedImageDataset["spectracksampleid"]

    if(dataType && tissueType && spectracksampleid) {
        return dataType + " for " + tissueType + " sample " + spectracksampleid
    }
    
    return "Viewing Spatial Data"
}

export const includesLetter = (stringToCheck) => { return /[a-zA-Z]/.test(stringToCheck); }

export const compareNumeric = (a, b) => {
    let numberA = a.replace(/[a-z]/g, '');
    let numberB = b.replace(/[a-z]/g, '');
    
    if (parseInt(numberA) < parseInt(numberB)) {
        return 1
    } else if (parseInt(numberA) > parseInt(numberB)) {
        return -1
    } else {
        return 0
    }
}

export const compareAlphaNumeric = (a, b) => {
    a = a.toLowerCase()
    b = b.toLowerCase()
    let letterA = a.replace(/[0-9]/g, '');
    let letterB = b.replace(/[0-9]/g, '');

    if (a === b) {
        return 0
    }

    // sort on numbers first
    const comparedNumerics = compareNumeric(a,b)
    if(comparedNumerics !== 0) {
        return comparedNumerics
    }

    // a AND b contains letters
    if (includesLetter(a) && includesLetter(b)) {
        
        let asplit = letterA.split('')
        let bsplit = letterB.split('')
        
        let index = 0
        for (let ele of asplit) { // eslint-disable-line
            if(bsplit[index] !== undefined && asplit[index] > bsplit[index]) {
                return 1
            }
            index++
        };
    }
    
    // a OR b contains letters
    if (includesLetter(a) || (includesLetter(b) && a < b ) ) {
        return -1
    } else {
        return 1
    }
}

export const compareTableStrings = (a, b) => {
    if(a && a.props && a.props.children && b && b.props && b.props.children) {

        a = a.props.children.toString().split('-')
        b = b.props.children.toString().split('-')

        const initialCompare = compareAlphaNumeric(a[0],b[0])
        if(initialCompare === 0 && a[1] && b[1]) {
            return compareAlphaNumeric(a[1], b[1])
        } else {
            return initialCompare
        }
    }
}