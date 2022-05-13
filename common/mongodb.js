'use strict';

const { MongoClient } = require('mongodb');
const config = require('./config');
const client =  new MongoClient(config.mongoUri, {useUnifiedTopology: true})

const mongo = {

    getDataFromDb: async (collectionName, findObj) => {
        try{
            await client.connect();
            let result = await client.db(config.dbName).collection(collectionName).findOne(findObj);
            return result;
        }
        catch(err){
            console.log(err);
            return {error: err}
        }
        finally{
            await client.close();
        }
    },

    insertIntoDb: async (collectionName, insertObj) => {
        try{
            await client.connect();
            let result = await client.db(config.dbName).collection(collectionName).insert(insertObj);
            return result;
        }
        catch(err){
            console.log(err);
            return {error: err.writeErrors.map(err => err.errmsg)};
        }
        finally{
            await client.close();
        }
    },

    updateDb: async (collectionName, matchObj, updateObj) => {
        try{
            await client.connect();
            let result = await client.db(config.dbName).collection(collectionName)
            .updateOne(matchObj, { $set: updateObj });
            return result;
        }
        catch(err){
            console.log(err);
            return {error: err}
        }
        finally{
            await client.close();
        }
    },

    getTopClientFromDb: async (collectionName) => {
        try{
            await client.connect();
            let result = await client.db(config.dbName).collection(collectionName)
            .aggregate([ 
                {
                    "$group": {
                        "_id": null,
                        "maxBill": {
                            "$max": "$totalBill"
                        },
                        "docs": {
                            "$push": {
                                "agencyId": "$agencyId",
                                "clientName": "$name",
                                "totalBill": "$totalBill",
                            }
                        }
                    }
                }, 
                {
                    "$project": {
                        _id: 0,
                        "topClients": {
                            "$setDifference": [
                                {
                                    "$map": {
                                        "input": "$docs",
                                        "as":"doc",
                                        "in": {
                                            "$cond": [{
                                                    "$eq": ["$maxBill", "$$doc.totalBill"]
                                                },
                                                "$$doc",
                                                false
                                            ]
                                        }
                                    }
                                },
                                [false]
                            ]
                        }
                    }
                },
                {$unwind: "$topClients"},
                {
                    $lookup: {
                        from: config.agencyCollection,
                        localField: "topClients.agencyId",
                        foreignField: "agencyId",
                        as: "agency"
                    },
                },
                {$unwind: "$agency"},
                { 
                    "$project": {
                        "agencyName": "$agency.name",
                        "clientName": "$topClients.clientName",
                        "totalBill": "$topClients.totalBill"
                    }
                }
            ]).toArray();
            return result;
        }
        catch(err){
            console.log(err);
            return {error: err}
        }
        finally{
            await client.close();
        }
    }
}

module.exports = mongo;