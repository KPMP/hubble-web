export const createHeaderString = (selectedImageDataset) => {

    const dataType = selectedImageDataset["datatype"]
    const tissueType = selectedImageDataset["tissuetype"]
    const participantId = selectedImageDataset["redcapid"]
    

    if(dataType && tissueType && participantId) {
        return dataType + " for " + tissueType + " participant " + participantId
    }
    
    return "Viewing Spatial Data"
}

export const compareTableStrings = (a, b) => {

    if(a && a.props && a.props.children && b && b.props && b.props.children) {
        a = a.props.children.toString()
        b = b.props.children.toString()
        return a.localeCompare(b, 'en', { numeric: true, usage: 'sort', sensitivity: 'base'})            
    }
}