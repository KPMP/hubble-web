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

export const tableSettingsToParams = (tableSettings) => {
    let {cards, sorting, columnWidths, ...searchObj} = tableSettings;
    let oldSearchParams = new URLSearchParams(window.location.search.replace("?", ""));
    let oldSearchObj = Object.fromEntries(oldSearchParams.entries());
    let searchParams = new URLSearchParams({...oldSearchObj, ...searchObj});
    return searchParams;
};

export const pushTableSettingsToHistory = (history, tableSettings) => {
    const tableSettingsParams = tableSettingsToParams(tableSettings);
    history.replace({search: "?" + tableSettingsParams.toString()});
};

export const paramsToTableSettings = (params) => {
    let searchParams = new URLSearchParams(window.location.search);
    let searchParamObj = Object.fromEntries(searchParams.entries());
    let { pagingSize, hiddenColumnNames } = searchParamObj;
    return { pagingSize: pagingSize, hiddenColumnNames: hiddenColumnNames };
};


