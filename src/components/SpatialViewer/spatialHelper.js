export const createHeaderString = (selectedImageDataset) => {

    const dataType = selectedImageDataset["datatype"]
    const tissueType = selectedImageDataset["tissuetype"]
    const participantId = selectedImageDataset["redcapid"]
    

    if(dataType && tissueType && participantId) {
        return dataType + " for " + tissueType + " participant " + participantId
    }
    
    return "Viewing Spatial Data"
}