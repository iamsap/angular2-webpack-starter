import { Router, Response, Request } from "express";

const userRouter: Router = Router();
const AWS = require('aws-sdk');
const uuid = require('node-uuid');

AWS.config.loadFromPath('./server/aws.json');

userRouter.get("/", (request: Request, response: Response) => {
  response.status(200).json({success:true});
});

userRouter.post("/new", (request: Request, response: Response) => {
  console.log('/api/user/new');
  console.log(request.body);

  var body = "";
  request.on('data', function (chunk) {
    console.log('Form data...');
    body += chunk;
  });
  request.on('error', function(err){
    console.log(err);
  });
  request.on('end', function () {

    console.log('end() loaded...');

    var db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    var docClient = new AWS.DynamoDB.DocumentClient();

    let userId = uuid.v1();
    let userObj = JSON.parse(body);
    if(!userObj){
      return response.status(401).send('Missing parameters');
    }
    userObj['userId'] = userId;
    userObj['isInactive'] = 0;

    console.log(JSON.stringify(userObj));

    var params = {
      TableName:"users",
      Item:userObj
    };

    console.log('Putting userObj into DynamoDB');
    docClient.put(params, function(err, data) {
      if (err) {
        response.status(500).json(err);
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        response.status(200).json({success:true, userId:userId});
      }
    });

  });

  console.log('hope it works...');

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
