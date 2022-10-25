export const resultConverter = (results) => {
    return results.map(row => {
        let newRow =  Object.keys(row).reduce((attrs, key)=> ({...attrs, [key]: row[key].raw}), {});
        if (newRow["filename"]) {
            newRow["longfilename"] = newRow["filename"];
            newRow["filename"] = removeUUID(newRow["filename"]);
        }
        return newRow;
    })
};

export const exprimentalDataConverter = (data={}) => {
    let spatialData = data.spatialViewerDataTypes;
    let explorerData = data.explorerDataTypes;
    let result = formatData(spatialData, result, 'spatial-viewer');
    result = formatData(explorerData, result, 'explorer');
    return result;
}

const formatData = (data={}, result=[], toolName='') => {
    data.forEach((datum) => {
        result.push({key: datum.dataType, value: datum.count, tool: toolName, isAggregated: datum.isAggregatedData})
    });
    return result;
}

export const dataToTableConverter = (data=[]) => {
    return Object.keys(data).map((key, index) => {
        return {
            key: key,
            value: data[key]
        }
    })
}


export const removeUUID = (text) => {
    return text.substring(37);
};

export const mapKeysToPresentationStyle = (data) => {
    const result = {}
    if (data['redcapId']) {
        result['Participant ID'] = data['redcapId'];
    }
    if (data['tissueType']) {
        result['Disease Type'] = data['tissueType'];
    }
    return result
}