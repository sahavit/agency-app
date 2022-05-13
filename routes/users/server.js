'use strict';

const express = require('express');
const router = express.Router();
const utils = require('./utils');
const utility = require('../../common/utilities');

router.post('/', async (req, res) => {
    try{
        let schema = utils.getLoginSchema();
        let validateStatus = await utility.validateSchema(schema, req.body).catch();

        if(validateStatus.error){
            let errBody = utility.getErrorResponseBody(400, 'Bad request', JSON.stringify(validateStatus.error), req.originalUrl);
            return res.status(400).json(errBody);
        }
        else{
            let verifyStatus = await utils.verifyCredentials(req.body).catch();
            if(!verifyStatus){
                let errBody = utility.getErrorResponseBody(400, 'Bad request', 'Incorrect credentials', req.originalUrl);
                return res.status(400).json(errBody);
            }

            let token = await utils.createJwtToken({username: req.body.username});
            return res.status(200).json({token: token});
        }
    }
    catch(err){
        console.log('error',err)
        let errBody = utility.getErrorResponseBody(500, 'Server Error', 'Some error occcured', req.originalUrl);
        return res.status(500).json(errBody);
    }
});

module.exports = router;