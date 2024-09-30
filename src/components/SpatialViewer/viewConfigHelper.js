import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';
import threeDCytometryViewNoChannelsConfig from './threeDCytometryViewNoChannelsConfig.json';
import stViewConfig from './spatialTranscriptomicsViewConfig.json'
import segmentationConfig from './segmentationViewConfig.json';
import { getFileLink } from "../../helpers/Api";
import { loadOmeTiff } from '@hms-dbmi/viv';
import { unit } from 'mathjs';

export const getViewConfig = (type) => {
    switch (type) {
        case '3D Tissue Imaging and Cytometry':
            return threeDCytometryViewConfig;
        case '3D Tissue Imaging and Cytometry No Channels':
            return threeDCytometryViewNoChannelsConfig;
        case 'CODEX':
            return threeDCytometryViewConfig;
        case 'Light Microscopic Whole Slide Images':
            return lmViewConfig;
        case 'Spatial Transcriptomics':
            return stViewConfig;
        case 'Segmentation Masks & Pathomics Vectors':
            return segmentationConfig;
        default:
            return threeDCytometryViewConfig
    }
};

export const getDatasetInfo = (selectedDataset) => {
    let datasetInfo = '';
    if(selectedDataset["imagetype"]) {
        if(selectedDataset["datatype"] === "Light Microscopic Whole Slide Images" && selectedDataset["level"]) {
            datasetInfo = `${selectedDataset["imagetype"]} (${selectedDataset["level"]})`
        } else {
            datasetInfo = selectedDataset["imagetype"]
        }
    }
    return datasetInfo;
}

const populateSegmentationConfig = async (stringifiedConfig, wsiUrl, maskUrl) => {
    const wsiLoader = await loadOmeTiff(wsiUrl);
    const maskLoader = await loadOmeTiff(maskUrl);
    const physicalSizeX = unit(wsiLoader.metadata.Pixels.PhysicalSizeX, (wsiLoader.metadata.Pixels.PhysicalSizeXUnit.replace(/[µ|?]/g, 'u'))).to("um").toNumber();
    const physicalSizeY = unit(wsiLoader.metadata.Pixels.PhysicalSizeY, (wsiLoader.metadata.Pixels.PhysicalSizeYUnit.replace(/[µ|?]/g, 'u'))).to("um").toNumber();
    stringifiedConfig = stringifiedConfig.replace('"<PHYSICAL_SIZE_X>"', physicalSizeX);
    stringifiedConfig = stringifiedConfig.replace('"<PHYSICAL_SIZE_Y>"', physicalSizeY);

    let spatialChannelOpacity = {"A": 1, "B": 1, "C": 1};
    let spatialTargetC = {"A": 0, "B": 1, "C": 2};
    let spatialChannelColor = {"A": [255,0,0], "B": [0,255,0], "C": [0,0,255]};
    let spatialChannelVisible = {"A": true, "B": true, "C": true};
    var segmentationChannel = {}, obsColorEncoding = {}, filled = {}, 
        strokeWidth = {}, coordsArray = {}, coordSpatialTargetC = {};
    let coordSegmentationChannel = {"A": []};
    maskLoader.metadata.Pixels.Channels.forEach((channel, i) => {
        let indexFromA = String.fromCharCode(65+i);
        let indexFromD = String.fromCharCode(68+i);
        spatialChannelOpacity[indexFromD] = 0.75;
        spatialTargetC[indexFromD] = i;
        let color = [];
        switch (channel.Name.toLowerCase()) {
            case "non-globally-sclerotic glomeruli":
                color = [239, 226, 82]; // yellow
                break;
            case "globally-sclerotic glomeruli": 
                color = [228, 158, 37]; // light orange
                break;
            case "tubules":
                color = [91, 181, 231]; // light blue
                break;
            case "arteries/arterioles":
                color = [202, 122, 166]; // pink
                break;
            case "ptc":
            case "peritubular-capillaries":
                color = [22, 157, 116]; // green
                break;
            case "ifta":
            case "interstitial fibrosis and tubular atrophy":
                color = [211, 94, 26]; // dark orange
                break;
            case "cortex":
            default:
                color = [255, 255, 255]; // white
                break;
        }
        spatialChannelColor[indexFromD] = color;
        spatialChannelVisible[indexFromD] = true; 
        segmentationChannel[indexFromA] = channel.Name;
        obsColorEncoding[indexFromA] = "spatialChannelColor";
        filled[indexFromA] = true;
        strokeWidth[indexFromA] = 1;
        coordSegmentationChannel["A"].push(indexFromA);
        coordsArray[indexFromA] = indexFromA;
        coordSpatialTargetC[indexFromA] = indexFromD;
    })
    stringifiedConfig = stringifiedConfig.replace('"<SPATIAL_CHANNEL_OPACITY>"', JSON.stringify(spatialChannelOpacity))
        .replace('"<SPATIAL_TARGET_C>"', JSON.stringify(spatialTargetC))
        .replace('"<SPATIAL_CHANNEL_COLOR>"', JSON.stringify(spatialChannelColor))
        .replace('"<SPATIAL_CHANNEL_VISIBLE>"', JSON.stringify(spatialChannelVisible))
        .replace('"<SEGMENTATION_CHANNEL>"', JSON.stringify(segmentationChannel))
        .replace('"<OBS_TYPE>"', JSON.stringify(segmentationChannel))
        .replace('"<FILLED>"', JSON.stringify(filled))
        .replace('"<STROKE_WIDTH>"', JSON.stringify(strokeWidth))
        .replace('"<OBS_COLOR_ENCODING>"', JSON.stringify(obsColorEncoding))
        .replace('"<COORD_SEGMENTATION_CHANNEL>"', JSON.stringify(coordSegmentationChannel))
        .replace('"<COORD_OBS_TYPE>"', JSON.stringify(coordsArray))
        .replace('"<COORD_FILLED>"', JSON.stringify(coordsArray))
        .replace('"<COORD_STROKE_WIDTH>"', JSON.stringify(coordsArray))
        .replace('"<COORD_SPATIAL_TARGET_C>"', JSON.stringify(coordSpatialTargetC))
        .replace('"<COORD_SPATIAL_CHANNEL_COLOR>"', JSON.stringify(coordSpatialTargetC))
        .replace('"<COORD_SPATIAL_CHANNEL_OPACITY>"', JSON.stringify(coordSpatialTargetC))
        .replace('"<COORD_SPATIAL_CHANNEL_VISIBLE>"', JSON.stringify(coordSpatialTargetC))
        .replace('"<COORD_OBS_COLOR_ENCODING>"', JSON.stringify(coordsArray))
    return stringifiedConfig;
}



export const populateViewConfig = async (viewConfig, selectedDataset) => {
    let stringifiedConfig = JSON.stringify(viewConfig);
    let imageUrlResponse = await getFileLink(selectedDataset["packageid"] + '/' + selectedDataset["longfilename"]);
    if (selectedDataset["relatedfiles"].length > 0) {
        let relatedFiles = [];
        selectedDataset['relatedfiles'].forEach(function (item, index) {
            relatedFiles.push(JSON.parse(item));
        });
        let ext = relatedFiles[0]['filename'].split('.').pop();
        let dataUrl = (ext === "zarr") 
            ? getPublicFileLink(selectedDataset["packageid"], relatedFiles[0]['filename']) 
            : await getFileLink(relatedFiles[0]['packageid'] + "/" + relatedFiles[0]['filename']); 
        stringifiedConfig = stringifiedConfig.replace(/<DATA_FILE_URL>/gi, dataUrl);

        if (selectedDataset["configtype"] === "Segmentation Masks & Pathomics Vectors") {
            stringifiedConfig = stringifiedConfig.replace('<SEGMENTATION_MASK_NAME>', selectedDataset["filename"]);
            stringifiedConfig = stringifiedConfig.replace('<SEGMENTATION_MASK_URL>', imageUrlResponse.data);
            stringifiedConfig = await populateSegmentationConfig(stringifiedConfig, dataUrl.data, imageUrlResponse.data);
            selectedDataset = relatedFiles[0];
            imageUrlResponse = dataUrl;
        }
    }
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_NAME>', selectedDataset["filename"]);
    stringifiedConfig = stringifiedConfig.replace('<IMAGE_URL>', imageUrlResponse.data);
    stringifiedConfig = stringifiedConfig.replace('<DATASET_INFO>', getDatasetInfo(selectedDataset));
    return JSON.parse(stringifiedConfig);
}

export const getPublicFileLink = (packageId, fileName) => {
    return "https://kpmp-knowledge-environment-public.s3.amazonaws.com/" + packageId + "/derived/" + fileName
}


export const getImageTypeTooltipCopy = (imageType) => {
    const availableCopy = {
        "RGB max projection of 8-channel immunofluorescence image volume": "8-channel volume combined into a single maximum projection and converted to RGB color space.",
        "Composite max projection of 8-channel immunofluorescence image volume": "8-channel volume combined into a single maximum projection; composite image consists of 8 channels.",
        "Composite 3D 8-channel immunofluorescence image volume": "3D volume completely represented as a stack of individual, 8-channel images. Every focal plane image and every channel can be independently inspected.",
        "RGB max projection of 2-channel (autofluorescence and second harmonic generation) image volume": "Projection of 3D volume collected prior to labeling; channels cannot be controlled.",
        "CODEX": '',
    };
    
    let copy = availableCopy[imageType];

    if (!copy) {
        copy = '';
    }
    return copy;
}

