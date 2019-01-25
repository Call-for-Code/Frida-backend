/**
 * Utility to prepare required output from the 3rd party api response
 */
import moment from 'moment';
import logger from './../lib/winston';

export default {
    responseSingle: (body) => {
        const formattedOutput = {
            id: body.id,
            location: {
                longitude: body.geometry.coordinates[0],
                latitude: body.geometry.coordinates[1],
                depth: body.geometry.coordinates[2],
            },
            properties: {
                magnitude: body.properties.products.mag,
                status: body.properties.status,
                type: body.properties.type,
                place: body.properties.place,
                time: moment(body.properties.time).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                lastUpdated: moment(body.properties.updated).format('dddd, MMMM Do YYYY, h:mm:ss a'),
                url: body.properties.url,
                numStations: body.properties.products.origin[0].properties['num-phases-used'],
                originSource: body.properties.products.origin[0].properties['origin-source'],
            },
        };
        return formattedOutput;
    },
    responseMultiple: (body) => {
        const mappedBody = body.features.map(value => ({
            id: value.id,
            mag: value.properties.mag,
            time: moment(value.properties.time).format('dddd, MMMM Do YYYY, h:mm:ss a'),
            updated: moment(value.properties.updated).format('dddd, MMMM Do YYYY, h:mm:ss a'),
            url: value.properties.url,
            status: value.properties.status,
            type: value.properties.type,
            magType: value.properties.magType,
            location: {
                longitude: value.geometry.coordinates[0],
                latitude: value.geometry.coordinates[1],
                depth: value.geometry.coordinates[2],
            },
        }));
        return mappedBody;
    },
    errorMultiple: (body) => {
        if (!body.features || !Array.isArray(body.features)) {
            return new Error('Unexpected Response from USGS API');
        }
        return null;
    },
    errorSingle: (body) => {
        if (!body.properties || !body.geometry || !body.properties.products
                || !body.properties.products.origin) {
            const error = new Error('Missing one or many body parameters in response');
            logger.info('Body');
            logger.info(Object.keys(body));
            logger.info(body);
            return error;
        }
        return null;
    },
};
