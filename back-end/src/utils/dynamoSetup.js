const AWS = require('aws-sdk');

const { IS_REGION, IS_NODE_ENV, IS_DYNAMODB_PORT } = process.env;

let config = {
  region: IS_REGION || 'us-east-1'
};

if (IS_NODE_ENV === 'TEST' || IS_NODE_ENV === 'LOCAL') {
  const dynamoPort = IS_DYNAMODB_PORT || '8000';

  config = Object.assign(config, {
    endpoint: new AWS.Endpoint(`http://localhost:${dynamoPort}`),
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey'
  });
}

AWS.config.update(config);

const docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
const dynamodb = new AWS.DynamoDB();

module.exports = {
  AWS,
  docClient,
  dynamodb
};
