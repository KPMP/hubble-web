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

export const removeUUID = (text) => {
    return text.substring(37);
};
