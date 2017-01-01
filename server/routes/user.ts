import { Router, Response, Request } from "express";

const userRouter: Router = Router();
const AWS = require('aws-sdk');
const uuid = require('node-uuid');

AWS.config.loadFromPath('./server/aws.json');

userRouter.get("/", (request: Request, response: Response) => {
  response.status(200).json({success:true});
});

userRouter.post("/new", (request: Request, response: Response) => {

  var db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    TableName : 'users',
    KeyConditionExpression: 'userId = :hkey',
    ExpressionAttributeValues: {
      ':hkey': request.params.userId
    }
  };

  var docClient = new AWS.DynamoDB.DocumentClient();

  var body = "";
  request.on('data', function (chunk) {
    body += chunk;
  });
  request.on('end', function () {


    let userId = uuid.v1();
    let userObj = JSON.parse(body);
    userObj['userId'] = userId;
    userObj['isInactive'] = 0;

    console.log(JSON.stringify(userObj));

    var params = {
      TableName:"users",
      Item:userObj
    };

    docClient.put(params, function(err, data) {
      if (err) {
        response.status(500).json(err);
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        response.status(200).json({success:true, userId:userId});
      }
    });

  });

});

userRouter.get("/:userId", (request: Request, response: Response) => {
  var db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

  var params = {
    TableName : 'users',
    KeyConditionExpression: 'userId = :hkey',
    ExpressionAttributeValues: {
      ':hkey': request.params.userId
    }
  };

  var docClient = new AWS.DynamoDB.DocumentClient();

  docClient.query(params, function(err, data) {
    if (err) {
      response.status(500).json(err);
    }
    else {
      if(data.Count){
        let user = data.Items[0];
        delete user['password'];
        delete user['email'];
        response.json(data.Items[0]);
      }else {
        response.send(null);
      }
    }
  });
});



export { userRouter };
