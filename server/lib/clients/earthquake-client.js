/**
 * Functions to make 3rd party api calls
 */

import request from 'request';
import httpStatus from 'http-status';
import logger from './../../lib/winston';

const BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/';
const QUERY_PATH = 'query?format=geojson';

function getEarthquakes(query, errorFunction, responseFunction) {
    return new Promise((resolve, reject) => {
        const fullUrl = `${BASE_URL}${QUERY_PATH}&${query}`;
        request.get(fullUrl, {}, (err, res, body) => {
            if (err || !body) {
                reject(err);
                return;
            } else if (res.statusCode !== httpStatus.OK) {
                reject(new Error(`Response code: ${res.statusCode}`));
                return;
            }
            const jsonBody = JSON.parse(body);
            const resError = errorFunction(jsonBody);
            if (resError) {
                logger.error("Earthquake Api call failed", resError);
                reject(resError);
            }
            const parsedResult = responseFunction(jsonBody);
            logger.info("Earthquake Api call completed successfully");
            resolve(parsedResult);
        });
    });
}

export default { getEarthquakes };
