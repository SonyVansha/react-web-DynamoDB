# Getting Started with Create React App

```sh
npx create-react-app users-processing-service
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

| Environment | Code Source |
|--|--|
|**API_URL**|URL API Gateway|

## API Gateway

| Resource | Method | CORS | Service Type |
|--|--|--|--|
|**/**| GET | yes | lambda |
|**/user**| POST | no | lambda |


## DynamoDB

| **Table Name** | **Partition key** |
|--|--|
| UserTable | id (N) |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## React To AWS code

#### Install UI MUI

```sh
npm install @mui/material @emotion/react @emotion/styled
```

#### Install package

```sh
npm install
```


#### Start React Web
```sh
npm start
```

## Example Code from Lambda use Nodejs 18
```sh
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: 'UserTable' // Name Table DynamoDB
}

const ListItems = async () => {
    try {
        const data = await docClient.scan(params).promise()
        return data
    } catch (error) {
        return error
    }
}

exports.handler = async (event, context) => {
    try {
        const data = await ListItems();
        return { body: JSON.stringify(data)}
    } catch(error) {
        return { error: error }
    }
};
```

## Example code lambda to Post Data from Postman

python
```sh
import boto3

def lambda_handler(event, context):
    client = boto3.client('dynamodb')

    response = client.put_item(
        TableName = 'UserTable',
        Item = {
            'id': {'N': str(event['id'])},
            'name': {'S': str(event['nama'])},
            'email': {'S': str(event['email'])},
            'phone': {'N': str(event['nomor'])},
            'salary': {'N': str(event['jual'])},
            'age': {'N': str(event['umur'])}
        }
    )
    return ("Sukses")
```