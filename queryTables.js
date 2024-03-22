const { dynamoDB, docClient } = require('./config/dynamoDBClient');
const { ListTablesCommand } = require("@aws-sdk/client-dynamodb");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

async function listTable() {
    try {
        // Using the scan command with async/await
        const data = await docClient.send(new ListTablesCommand());
        return data.TableNames;
    } catch (err) {
        console.error("Unable to list the tables. Error:", err);
        throw err;
    }
}

async function scanTable(tableName) {
    const params = {
        TableName: tableName,
    };

    try {
        // Using the scan command with async/await
        const data = await docClient.send(new ScanCommand(params));
        return data.Items;
    } catch (err) {
        console.error("Unable to scan the table. Error:", err);
        throw err;
    }
}

listTable("NamesTable")
    .then((items) => {
        // Process scan results here
        items.forEach((item) => {
            console.log(item);
        });
    })
    .catch((error) => {
        console.error("Error listing tables", error);
    });

// Example usage
scanTable("NamesTable")
    .then((items) => {
        // Process scan results here
        items.forEach((item) => {
            console.log(item);
        });
    })
    .catch((error) => {
        console.error("Error scanning table:", error);
    });


