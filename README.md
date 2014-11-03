sanjay:accounts-layer7
======================

A login service for Layer7 OAuth2.0. See the project page on Meteor Accounts for more details.

Currently only `authorization_code` grant type is supported. 

Whitelisted feilds for UserInfo page are: 
```javascript
['id', 'email', 'name', 'first_name', 'last_name', 'link', 'username', 'gender', 'locale', 'age_range']
```
Why you should care about the whitelisted fields: If your UserInfo endpoint contains any of the whitelisted fields, they will be stored in the user profile, all the other other feilds will be ignored. It is important to atleast have the `name` field in your UserInfo endpoint to dipspaly the user's name when they login.

Here is a suggested UserInfo json result:
----------------------------------------
```javascript
{
    "age_range": "20-30",
    "email": "email@example.com",
    "first_name": "John",
    "gender": "male",
    "id": "1234567",
    "last_name": "Doe",
    "link": "http://example.com/john_doe",
    "locale": "en_US",
    "name": "John Doe",
    "username": "john_doe"
}
```

UserInfo endpoint needs to return the correct user information based on the access_token. 
This is a reference implemenation from Facebook's UserInfo enpoint. 
For more details visit: https://developers.facebook.com/docs/graph-api/reference/v2.2/user

Pre-configure your service configuration
----------------------------------------

If you wish to pre-configure your service configuration at the app start-up you need to have the following code in run in your server.

```javascript
if (Meteor.isServer) {
    ServiceConfiguration.configurations.remove({
      service: "layer7"
    });
    
    ServiceConfiguration.configurations.insert({
      service: "layer7",
      appId: "54f0c455-4d80-421f-82ca-9194df24859d",
      secret: "a0f2742f-31c7-436f-9802-b7015b8fd8e6",
      authorizeEndpoint: "http://192.168.199.130:8080/meteor/auth/oauth/v2/authorize",
      tokenEndpoint: "http://192.168.199.130:8080/meteor/auth/oauth/v2/token",
      userInfoEndpoint: "http://192.168.199.130:8080/meteor/me"
    });
}
```

