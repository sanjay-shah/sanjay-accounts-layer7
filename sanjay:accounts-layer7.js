Accounts.oauth.registerService('layer7');

if (Meteor.isClient) {
  Meteor.loginWithLayer7 = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Layer7.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately
    // be used from the client (if transmitted over ssl or on
    // localhost). 
    // "Sharing of Access Tokens"
    forLoggedInUser: ['services.layer7'],
    forOtherUsers: [
      // 
      'services.layer7.id', 'services.layer7.username', 'services.layer7.gender'
    ]
  });
}
