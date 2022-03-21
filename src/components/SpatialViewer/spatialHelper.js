export const createHeaderString = (selectedImageDataset) => {

    const dataType = selectedImageDataset["datatype"]
    const tissueType = selectedImageDataset["tissuetype"]
    const redcapid = selectedImageDataset["redcapid"]

    if(dataType && tissueType && redcapid) {
        return dataType + " for " + tissueType + " participant " + redcapid
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