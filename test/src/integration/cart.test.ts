import { ApiGateway } from '../../utils/apigateway';
import App from '../../../src/app';
import { createServer, proxy } from 'aws-serverless-express';
import * as mongoose from 'mongoose';
import { CART }  from '../../utils/variable';

const server = createServer(App);

const lambdaFunction = {
  handler: (event, context, resolutionMode = null, callback=null, _server = null) => proxy(_server || server, event, context, resolutionMode, callback)
}

const clone = (json) => {
  return JSON.parse(JSON.stringify(json))
}

const makeEvent = (eventOverrides) => {
  const baseEvent = clone(ApiGateway)
  const headers = Object.assign({}, baseEvent.headers, eventOverrides.headers)
  const root = Object.assign({}, baseEvent, eventOverrides)
  root.headers = headers
  return root
}

describe('Integration testing for cart', () => {

  afterAll(async (done) => {
    await mongoose.disconnect();
    server && server.close();
    mongoose.connection.db.dropDatabase(done);
  });

  test('CREATE CART', (done) => {
    const requestData = { ...CART };
    const postBody = JSON.stringify(requestData);
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    };

    lambdaFunction.handler(makeEvent({
      path: '/cart',
      httpMethod: 'POST',
      body: `${postBody}`
    }), {
      succeed
    });
  });

  
})