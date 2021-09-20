export const createHeaderString = (selectedImageDataset) => {

    const dataType = selectedImageDataset["Data Type"]
    const tissueType = selectedImageDataset["Tissue Type"]
    const participantId = selectedImageDataset["Participant ID"]
    

    if(dataType && tissueType && participantId) {
        return dataType + " for " + tissueType + " participant " + participantId
    }
    
    return "Viewing Spatial Data"
}