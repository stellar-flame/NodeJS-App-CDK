const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const region = "us-west-2"; // Your region

// Initialize DynamoDB Client
const ddbClient = new DynamoDBClient({
  region: region,
  endpoint: "http://localhost:8000",
});

const docClient = DynamoDBDocumentClient.from(ddbClient);
module.exports = { ddbClient, docClient };
