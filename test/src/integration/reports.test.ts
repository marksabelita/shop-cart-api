import { ApiGateway } from '../../utils/apigateway';
import App from '../../../src/app';
import { createServer, proxy } from 'aws-serverless-express';
import * as mongoose from 'mongoose';

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

describe('Integration testing for reports', () => {

  afterAll(async (done) => {
    await mongoose.disconnect();
    server && server.close();
    mongoose.connection.db.dropDatabase(done);
  });

  test('GET REPORTS', (done) => {
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    };

    lambdaFunction.handler(makeEvent({
      path: '/reports/top',
      httpMethod: 'GET'
    }), {
      succeed
    });
  });
})