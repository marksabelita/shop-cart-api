import { ApiGateway } from '../../utils/apigateway';
import App from '../../../src/app';
import { createServer, proxy } from 'aws-serverless-express';
import * as mongoose from 'mongoose';
import { USER }  from '../../utils/variable';
import * as randomEmail from 'random-email';

const server = createServer(App);
let userId: string;

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

const makeResponse = (response) => {
  const baseResponse = {
    'body': '',
    'isBase64Encoded': false,
    'statusCode': 200
  }
  const baseHeaders = {
    'access-control-allow-origin': '*',
    'connection': 'close',
    'content-type': 'application/json; charset=utf-8',
    'x-powered-by': 'Express'
  }
  const headers = Object.assign({}, baseHeaders, response.headers)
  const finalResponse = Object.assign({}, baseResponse, response)
  finalResponse.headers = headers
  return finalResponse
}

describe('Integration testing for user', () => {

  afterAll(async (done) => {
    await mongoose.disconnect();
    server && server.close();
    mongoose.connection.db.dropDatabase(done);
  });

  test('RETURN 404', async (done) => {
    const succeed = response => {
      expect(response.statusCode).toEqual(404);
    
      makeResponse({
        'body': response.body,
        'headers': {
          'content-length': '46',
          'etag': 'W/"2e-Lu6qxFOQSPFulDAGUFiiK6QgREo"'
        }
      })

      done();
    }
    

    lambdaFunction.handler(makeEvent({
      path: '/users22',
      httpMethod: 'GET'
    }), {
      succeed
    })

  });

  test('GET USERS', async (done) => {
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    }

    lambdaFunction.handler(makeEvent({
      path: '/users',
      httpMethod: 'GET'
    }), {
      succeed
    })
  });

  test('CREATE USER', (done) => {
    const postBody = JSON.stringify({ ...USER, email: randomEmail() });
    const succeed = response => {
      const result = JSON.parse(response.body);
      userId = result.data._id;

      expect(response.statusCode).toEqual(200);
      done();
    };

    lambdaFunction.handler(makeEvent({
      path: '/users',
      httpMethod: 'POST',
      body: `${postBody}`
    }), {
      succeed
    });
  });

  test('GET USER BY ID', (done) => {
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    };

    lambdaFunction.handler(makeEvent({
      path: `/user/${userId}`,
      httpMethod: 'GET'
    }), {
      succeed
    });
  });

  test('UPDATE USER BY ID', (done) => {
    const requestData = { ...USER, email: randomEmail() };
    const postBody = JSON.stringify(requestData);
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    };

    lambdaFunction.handler(makeEvent({
      path: `/user/${userId}`,
      httpMethod: 'PUT',
      body: `${postBody}`
    }), {
      succeed
    });
  });

  test('DELETE USER BY ID', (done) => {
    const succeed = response => {
      expect(response.statusCode).toEqual(200);
      done();
    };

    lambdaFunction.handler(makeEvent({
      path: `/user/${userId}`,
      httpMethod: 'DELETE'
    }), {
      succeed
    });
  });

})