import lmViewConfig from './lightMicroscopyViewConfig.json';
import threeDCytometryViewConfig from './threeDCytometryViewConfig.json';
import threeDCytometryViewNoChannelsConfig from './threeDCytometryViewNoChannelsConfig.json';
import stViewConfig from './spatialTranscriptomicsViewConfig.json'
import segmentationConfig from './segmentationViewConfig.json';
import { getFileLink } from "../../helpers/Api";
import { loadOmeTiff } from '@hms-dbmi/viv';
import { unit } from 'mathjs';
import {
    VitessceConfig,
    CoordinationLevel as CL,
    getInitialCoordinationScopePrefix
} from 'vitessce'

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
        spatialChannelVisible[indexFromD] = false; 
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

const populateMAlDIConfig = async (selectedDataset) => {
    let imageUrlResponse = await getFileLink(selectedDataset["packageid"] + '/' + selectedDataset["longfilename"]);
    let maldiObj = {};
    if (selectedDataset["relatedfiles"].length > 0) {
        selectedDataset['relatedfiles'].forEach(function (item) {
            let parsed = JSON.parse(item);
            if(parsed['filename'].includes("_AF_")) {
                maldiObj.AF = parsed;
            }
            else if (parsed['filename'].includes("_IMS-lipids-pos")) {
                maldiObj.IMS = parsed;
            }
            else if (parsed['filename'].includes("_IMS-lipids-neg")) {
                maldiObj.IMS = parsed;
            }
            else if (parsed['filename'].includes(".json")) {
                maldiObj.json = parsed;
            }
        });
        let afUrl = await getFileLink(maldiObj.AF['packageid'] + "/" + maldiObj.AF['filename']);
        let imsUrl = await getFileLink(maldiObj.IMS['packageid'] + "/" + maldiObj.IMS['filename']);
        let jsonUrl = await getFileLink(maldiObj.json['packageid'] + "/" + maldiObj.json['filename']);
        let jsonFile = await fetch(jsonUrl.data).then(response => response.json()).then(data => {return data});
        let matrix = jsonFile['matrix_xy_um'];
        let pixelSizeUm = jsonFile['moving_paths'][0]['pixel_size_um'];
        let translation = [
            matrix[0][2]/(matrix[0][0]/pixelSizeUm), 
            matrix[1][2]/(matrix[1][1]/pixelSizeUm), 
            0, 
            0, 
            0
        ];
        const config = new VitessceConfig({
            schemaVersion: '1.0.16',
            name: 'A',
            description: 'Description'
        });
        const dataset = config.addDataset('A').addFile({
            fileType: 'image.ome-tiff',
            url: imageUrlResponse.data,
            name: "PAS",
            coordinationValues: {
                fileUid: "PAS"
            }
        }).addFile({
            fileType: 'image.ome-tiff',
            url: afUrl.data,
            name: "AF",
            coordinationValues: {
                fileUid: "AF"
            }
        }).addFile({
            fileType: 'image.ome-tiff',
            url: imsUrl.data,
            name: "IMS",
            coordinationValues: {
                fileUid: "IMS"
            },
            options: {
                coordinateTransformations: [
                    {
                        type: 'translation',
                        translation: translation
                    }
                ]
            }
        });
        const spatialView = config.addView(dataset, 'spatialBeta', { x: 0, y: 0, w: 9, h: 12 });
        const lcView = config.addView(dataset, 'layerControllerBeta', { x:  9, y: 0, w: 3, h: 12 });
    
        config.linkViewsByObject([spatialView, lcView], {
            imageLayer: CL([
                {
                    fileUid: 'PAS',
                    spatialLayerTransparentColor: null,
                    spatialLayerVisible: true,
                    spatialLayerOpacity: 1,
                    photometricInterpretation: "BlackIsZero",
                    imageChannel: CL([{
                        spatialTargetC: 0,
                        spatialChannelWindow: [0, 50],
                        spatialChannelColor: [255, 255, 255]
                    }]),
                },
                {
                  fileUid: 'AF',
                  spatialLayerTransparentColor: [0, 0, 0],
                  spatialLayerVisible: true,
                  spatialLayerOpacity: 1,
                  photometricInterpretation: "BlackIsZero",
                  imageChannel: CL([{
                        spatialTargetC: 0,
                        spatialChannelWindow: [10, 50],
                        spatialChannelColor: [255, 0, 255]
                    },
                    {
                        spatialTargetC: 1,
                        spatialChannelWindow: [10, 50],
                        spatialChannelColor: [255, 255, 0]
                    }]),
                },
                {
                  fileUid: 'IMS',
                  spatialLayerTransparentColor: [0, 0, 0],
                  spatialLayerVisible: true,
                  spatialLayerOpacity: 1,
                  photometricInterpretation: "BlackIsZero",
                  imageChannel: CL([{
                    spatialTargetC: 1,
                    spatialChannelWindow: [0, 3000],
                    spatialChannelColor: [0, 0, 255]
                  },{
                    spatialTargetC: 3,
                    spatialChannelWindow: [0, 3000],
                    spatialChannelColor: [0, 255, 0]
                  }]),
                }
            ])
        }, {meta: true, scopePrefix: getInitialCoordinationScopePrefix('A', 'image') }); // linkViewsByObject;
        return config.toJSON();
    }
}

export const populateViewConfig = async (viewConfig, selectedDataset) => {
    if (selectedDataset["configtype"] === "Multimodal Imaging Mass Spectrometry") {
        return populateMAlDIConfig(selectedDataset);
    }
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

