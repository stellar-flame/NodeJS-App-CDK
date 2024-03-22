const { ddbClient, docClient } = require('./config/dynamoDBClient');
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const params = {
    TableName : "NamesTable",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},  // Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

async function createTable() {
    try {
        const data = await docClient.send(new CreateTableCommand(params));
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Unable to create table. Error:", JSON.stringify(err, null, 2));
    }
}

createTable();

