'use strict';

const express = require('express');
const router = express.Router();
const utils = require('./utils');
const utility = require('../../common/utilities');
const config = require('../../common/config');

router.post('/', async (req, res) => {
    try{
        let schema = utils.getInsertSchema();
        let validateStatus = await utility.validateSchema(schema, req.body).catch();

        if(validateStatus.error){
            let errBody = utility.getErrorResponseBody(400, 'Bad request', JSON.stringify(validateStatus.error), req.originalUrl);
            return res.status(400).json(errBody);
        }
        else{
            req.body.clients = req.body.clients.map(client => {
                client['agencyId'] = req.body.agencyId;
                return client;
            })
            let clientRes = await utils.insertData(config.clientCollection, req.body.clients).catch();
            if(clientRes.error){
                let errBody = utility.getErrorResponseBody(500, 'Server error', JSON.stringify(clientRes.error), req.originalUrl);
                return res.status(500).json(errBody);
            }
    
            delete req.body.clients;
            let agencyRes = await utils.insertData(config.agencyCollection, req.body).catch();
            if(agencyRes.error){
                let errBody = utility.getErrorResponseBody(500, 'Server error', JSON.stringify(agencyRes.error), req.originalUrl);
                return res.status(500).json(errBody);
            }
    
            res.status(200).json({status: 'success'});
        }
    }
    catch(err){
        console.log('error',err)
        let errBody = utility.getErrorResponseBody(500, 'Server Error', 'Some error occcured', req.originalUrl);
        return res.status(500).json(errBody);
    }
});

router.patch('/', async (req, res) => {
    try{
        let schema = utils.getUpdateSchema();
        let validateStatus = await utility.validateSchema(schema, req.body).catch();

        if(validateStatus.error){
            let errBody = utility.getErrorResponseBody(400, 'Bad request', JSON.stringify(validateStatus.error), req.originalUrl);
            return res.status(400).json(errBody);
        }
        else{
            let clientId = req.body.clientId;
            let result = await utils.updateDbData(config.clientCollection, {clientId: clientId}, req.body).catch();
            if(result.error){
                let errBody = utility.getErrorResponseBody(500, 'Server error', JSON.stringify(result.error), req.originalUrl);
                return res.status(500).json(errBody);
            }
            res.status(200).json({status: 'success'});
        }
    }
    catch(err){
        console.log('error',err)
        let errBody = utility.getErrorResponseBody(500, 'Server Error', 'Some error occcured', req.originalUrl);
        return res.status(500).json(errBody);
    }
});

router.get('/', async (req, res) => {
    try{
        let result = await utils.getTopClientData(config.clientCollection);
        if(result.error){
            let errBody = utility.getErrorResponseBody(500, 'Server error', JSON.stringify(result.error), req.originalUrl);
            return res.status(500).json(errBody);
        }
        res.status(200).json({ topCLients: result });
    }
    catch(err){
        console.log('error',err)
        let errBody = utility.getErrorResponseBody(500, 'Server Error', 'Some error occcured', req.originalUrl);
        return res.status(500).json(errBody);
    }
})

module.exports = router;