'use strict';

const Joi = require('joi');
const mongodb = require('../../common/mongodb');

const utility = {
    getInsertSchema: () =>{
        return Joi.object({
            agencyId: Joi.string().required(),
            name: Joi.string().required(),
            address1: Joi.string().required(),
            address2: Joi.string().optional(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            phoneNumber: Joi.number().required(),
            clients: Joi.array().items(
                Joi.object({
                    clientId: Joi.string().required(),
                    name: Joi.string().required(),
                    email: Joi.string().email({tlds:{ allow: false }}).required(),
                    phoneNumber: Joi.number().required(),
                    totalBill: Joi.number().required()
                }).required()
            ).required()
        });
    },

    getUpdateSchema: () =>{
        return Joi.object({
            clientId: Joi.string().required(),
            agencyId: Joi.string().optional(),
            name: Joi.string().optional(),
            email: Joi.string().email({tlds:{ allow: false }}).optional(),
            phoneNumber: Joi.number().optional(),
            totalBill: Joi.number().optional()
        }).required();
    },

    insertData: async (collection, insertData) => {
        return await mongodb.insertIntoDb(collection, insertData);
    },

    updateDbData: async(collectionName, matchObj, updateObj) => {
        return await mongodb.updateDb(collectionName, matchObj, updateObj);
    },

    getTopClientData: async (collectionName) => {
        return await mongodb.getTopClientFromDb(collectionName);
    }
};

module.exports = utility;