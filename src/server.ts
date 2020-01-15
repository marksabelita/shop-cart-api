import app from "./app";
import * as serverless from "serverless-http";
// import database from './database/configuration';

const handler = serverless(app);
module.exports.handler = async (event, context) => {
    // await database.authenticate();
    return await handler(event, context);
};