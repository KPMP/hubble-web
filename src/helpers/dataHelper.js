export const resultConverter = (results) => {
    return results.map(row => {
        return Object.keys(row).reduce((attrs, key)=> ({...attrs, [key]: row[key].raw}), {});
    })
};

