sanjay:accounts-layer7
======================

A login service for Layer7 OAuth2.0. See the project page on Meteor Accounts for more details: https://www.meteor.com/accounts

Currently only `authorization_code` grant type is supported. 

WARNING: It looks like there is an issue with OAuth2 login when running mobile apps in local development mode. For workarounds see https://github.com/meteor/meteor/wiki/OAuth-for-mobile-Meteor-clients
         
         Meteor's OAuth2 implementation does not currently work with
         mobile apps in local development mode, except in the iOS
         simulator. You can run the iOS simulator with 'meteor run ios'.
         For additional workarounds, see
         https://github.com/meteor/meteor/wiki/OAuth-for-mobile-Meteor-clients.

UserInfo Endpoint
-----------------

### Whitelisted feilds for UserInfo Endpoint are

```javascript
['id', 'email', 'name', 'first_name', 'last_name', 'link', 'username', 'gender', 'locale', 'age_range']
```
### Why you should care about the whitelisted fields?

If your UserInfo endpoint contains any of the whitelisted fields, they will be stored in the user profile, all the other other feilds will be ignored. It is important to atleast have the `name` field in your UserInfo endpoint to dipspaly the user's name when they login.

### Here is a suggested UserInfo json result

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
      authorizeEndpoint: "http://example.com/auth/oauth/v2/authorize",
      tokenEndpoint: "http://example.com/auth/oauth/v2/token",
      userInfoEndpoint: "http://example.com/userInfo/me"
    });
}
```


