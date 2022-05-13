'use strict';

const config = {
    jwtSecret: '@#secret#!',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/agency-app',
    dbName: 'agency-app',
    usersCollection: 'users',
    clientCollection: 'client',
    agencyCollection: 'agency'
};

module.exports = config;