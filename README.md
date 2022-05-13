# agency-app

A simple authentication based app to execute CRUD operations. This application is hosted on heroku and can be used for testing.
Base URL - https://limitless-hollows-40651.herokuapp.com

1. Login API -

Description - It is used to login to the app using JWT based authentication. It return a token which can be used for subsequest API calls.
Endpoint - POST <base-url>/api/login
Body - {
    "username": "john",
    "password": "john@123"
}
<Please use above credentials to login>
API Response - {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NTI0NDU0MDMsImV4cCI6MTY1MjQ1MjYwM30.65C8MBJvV8RNGKsPuYhurOOQleGrXbj2pfE6nANTHv4"
}
  
2. Create Agency and Client in a Single REST API - 
  
Description - It is used to create a new agency and multiple clients for that agency. 
Endpoint - POST <base-url>/api/agency
Headers - token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NTI0NDU0MDMsImV4cCI6MTY1MjQ1MjYwM30.65C8MBJvV8RNGKsPuYhurOOQleGrXbj2pfE6nANTHv4

Body Example - {
    "agencyId": "A101",
    "name": "Pacific Agency",
    "address1": "2518 Sunset Drive",
    "state": "Arkansas",
    "city": "Watson",
    "phoneNumber": "912345678",
    "clients": [
        {
            "clientId": "C101",
            "name": "East Client",
            "email": "east_client@client.com",
            "phoneNumber": "987654321",
            "totalBill": "238799"
        },
        {
            "clientId": "C102",
            "name": "West Client",
            "email": "west_client@client.com",
            "phoneNumber": "912348765",
            "totalBill": "123498"
        }
    ]
}
  
API Response - {
    "status": "success"
}
  

3. Edit Client Details API - 
  
Description - It is used to edit the details of an existing client. 
Endpoint - PATCH <base-url>/api/agency
Headers - token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NTI0NDU0MDMsImV4cCI6MTY1MjQ1MjYwM30.65C8MBJvV8RNGKsPuYhurOOQleGrXbj2pfE6nANTHv4
Body Example - {
    "clientId": "C103",  //required
    "agencyId": "A101",    //optional
    "name": "North Client",   //optional
    "email": "northern_client@client.com",  //optional
    "phoneNumber": "123456789"  //optional
    "totalBill": "2234566"     //optional
}
API Response - {
    "status": "success"
}
  
  
4. Get Top Client for agency with maximum totalBill API
Description - It is used to get the name of agency along with client details which has top client(s) with maximum total bill
Endpoint - GET <base-url>/api/agency
Headers - token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2NTI0NDU0MDMsImV4cCI6MTY1MjQ1MjYwM30.65C8MBJvV8RNGKsPuYhurOOQleGrXbj2pfE6nANTHv4
API Response - {
    "topCLients": [
        {
            "agencyName": "Pacific Agency",
            "clientName": "East Client",
            "totalBill": "238799"
        },
        {
            "agencyName": "Cordia Agency",
            "clientName": "Glider Client",
            "totalBill": "238799"
        }
    ]
}
  
