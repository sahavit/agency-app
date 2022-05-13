'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('./common/middleware');
const utility = require('./common/utilities');

router.use(middleware.allowCrossDomain);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/agency', middleware.verifyToken, require('./routes/agency-client/server'));
router.use('/login', require('./routes/users/server'));

//Invalid Endpoint Handling
router.use('*', (req, res) => {
    let errorBody = utility.getErrorResponseBody(400, 'Bad request', 'URL not found', req.originalUrl);
    res.status(400).json(errorBody);
});

app.use('/api', router);

let server = app.listen(process.env.PORT || 3000, function () {
    let port = server.address().port;
    console.log('API is running on port', port);
});