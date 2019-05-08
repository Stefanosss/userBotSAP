const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config');


const app = express();
app.use(bodyParser.json());

// routes
app.get('/users', getUsers);
app.post('/users', getUsersPost);
app.post('/usersFilter', getUsersFilterUserName);

app.post('/errors', function(req, res) {
  console.log(req.body);
  res.sendStatus(200);
});

//port
const port = config.PORT;
app.listen(port, function() {
  console.log(`App is listening on port ${port}`);
});

function getUsersPost(req, res)
{
  var url = "https://sandbox.api.sap.com/successfactors/odata/v2/User('"+ req.body.userId +"')?$format=json";

  request(
    {
        method: 'GET',
        url : url,
        headers : {
            "apikey": "eGuG7myXgIgGZXZgH0Rmwoa4oYkjbzvq"
        }
    },
    function (error, response, body) {
      
      var response = JSON.parse(body);
      console.log(response);

      res.json({
        replies: [
          {
          type: 'text', 
          content: "ID: " + response.d.userId + " \nUsername: " + response.d.username + " \nBusinessPhone: " + response.d.businessPhone  + " \nEmail: " + response.d.email + " \n Job Title: " + response.d.jobTitle + " \n First name: " + response.d.firstName + " \n Last name: " + response.d.lastName + " \n Gender: " + response.d.gender + " \n Salary: " + response.d.salary + " \n Currency: " + response.d.localCurrencyCode + " \n Country: " + response.d.country
        }
      ]
      });
	
  });
  
  
}

function getUsers(req, res)
{
  var url = "https://sandbox.api.sap.com/successfactors/odata/v2/User('1')?%24format=json";

  request(
    {
        method: 'GET',
        url : url,
        headers : {
            "apikey": "eGuG7myXgIgGZXZgH0Rmwoa4oYkjbzvq"
        }
    },
    function (error, response, body) {
      
      var response = JSON.parse(body);

      //var txt = "BusinessPhone:" + response.d.businessPhone  + " \nusername: " + response.d.username;

      console.log(response.d);

      res.json({
        replies: [
          {
          type: 'text', 
          content: "ID: " + response.d.userId + " \nUsername: " + response.d.username + " \nBusinessPhone: " + response.d.businessPhone  + " \nEmail: " + response.d.email + " \n Job Title: " + response.d.jobTitle + " \n First name: " + response.d.firstName + " \n Last name: " + response.d.lastName + " \n Gender: " + response.d.gender + " \n Salary: " + response.d.salary + " \n Currency: " + response.d.localCurrencyCode + " \n Country: " + response.d.country
                  
        }
      ]
      });
	
	});
}

function getUsersFilterUserName(req, res)
{
  var url = "https://sandbox.api.sap.com/successfactors/odata/v2/User?$filter=lastName eq '"+ req.body.lastName +"' &$format=json";

  request(
    {
        method: 'GET',
        url : url,
        headers : {
            "apikey": "eGuG7myXgIgGZXZgH0Rmwoa4oYkjbzvq"
        }
    },
    function (error, response, body) {
      
      var response = JSON.parse(body);
      

      console.log(response.d.results[0]);

      res.json({
        replies: [
          {
          type: 'text', 
          content: "ID: " + response.d.results[0].userId + " \nUsername: " + response.d.results[0].username + " \nBusinessPhone: " + response.d.results[0].businessPhone + " \nEmail: " + response.d.results[0].email + " \n Job Title: " + response.d.results[0].jobTitle + " \n First name: " + response.d.results[0].firstName + " \n Last name: " + response.d.results[0].lastName + " \n Gender: " + response.d.results[0].gender + " \n Salary: " + response.d.results[0].salary + " \n Currency: " + response.d.results[0].localCurrencyCode + " \n Country: " + response.d.results[0].country
                  
        }
      ]
      });
	
  });
  
  
}