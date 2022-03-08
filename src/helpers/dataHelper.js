import { readRemoteFile } from 'react-papaparse';

export const getSpatialDataAsJSON = async () => {
    return new Promise(resolve => {
        readRemoteFile(process.env.REACT_APP_SPATIAL_DATA_PATH, {
            download: true,
            header: true,
            complete: (results) => {
                resolve(results.data);
            }
        });
    });
};

export const resultConverter = (results) => {
    return results.map(row => {
        return Object.keys(row).reduce((attrs, key)=> ({...attrs, [key]: row[key].raw}), {});
    })
};


