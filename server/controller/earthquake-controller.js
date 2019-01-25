import querystring from 'query-string';
import usgsClient from '../lib/clients/earthquake-client';
import utilUsgs from '../utils/response-util';
import logger from './../lib/winston';

// Globals

/**
 * Gets a list of all historical earthquakes near a point
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {*} next
 */
function getHistory(req, res, next) {
   
    const data = {
        latitude: req.query.lat,
        longitude: req.query.long,
        limit: 250,
        maxradiuskm: req.query.radius || 5,
        minmagnitude: req.query.minMagnitude || 1.5,
        orderby: 'magnitude',
    };

    usgsClient.getEarthquakes(querystring.stringify(data), utilUsgs.errorMultiple,
        utilUsgs.responseMultiple)
    .then((results) => {
        logger.info("getHistory controller executed successfully");
        res.json(results);
    })
    .catch(e => next(e));
}

export default { getHistory };