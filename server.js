/**
 * File to create routes for our backend api
 */

// imports
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import expressWinston from 'express-winston';
import winstonInstance from './server/lib/winston';
import earthquakeController from './server/controller/earthquake-controller';

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable detailed API logging in dev env
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
app.use(expressWinston.logger({
    winstonInstance,
    meta: true,  // set to false to avoid printing the req and res
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
}));

var port = process.env.PORT || 3001;

// Logging
console.log('---------------------------------');
console.log('Running Frida Backend....');
console.log('Server running on port ' + port);
console.log('---------------------------------');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// Route to get earthquake magnitude
router.get('/earthquakes',earthquakeController.getHistory);

// more routes for our API will happen here


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /v1
app.use('/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);
