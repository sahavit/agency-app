'use strict';
const utility = require('./utilities');
const config = require('./config');
const jwt = require('jsonwebtoken');

const middleware = {
    allowCrossDomain: (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
        res.header('Access-Control-Allow-Headers', '*');

        next();
    },
    
    verifyToken: async (req, res, next) => {
        if(req.headers['token']){
            try{
                await jwt.verify(req.headers['token'], config.jwtSecret);
                next();
            }
            catch(err){
                let message = 'Failed to authenticate token';
                let errorBody = utility.getErrorResponseBody(401,'Token Error',message,req.originalUrl);
                return res.status(401).json(errorBody);
            }
        }
        else{
            let message = 'Please Login to access this route';
            let errorBody = utility.getErrorResponseBody(401,'Token missing',message,req.originalUrl);
            return res.status(401).json(errorBody);
        }
    }
};

module.exports = middleware;