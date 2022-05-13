'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('../../common/config');
const mongodb = require('../../common/mongodb');

const utility = {
    getLoginSchema: () =>{
        return Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        });
    },

    verifyCredentials: async (body) => {
        let data = await mongodb.getDataFromDb(config.usersCollection, {username: body.username});
        if(!data || data.password !== body.password){
            return false;
        }
        return true;
    },

    createJwtToken: (payload) => {
        let token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: 7200
        });
        return token;
    },
};

module.exports = utility;