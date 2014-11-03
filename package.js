Package.describe({
  name: 'sanjay:accounts-layer7',
  summary: 'Login service for Layer7 accounts',
  version: '1.0.0',
  git:'https://github.com/sanjay-shah/sanjay-accounts-layer7.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('sanjay:layer7', ['client', 'server']);
  
  api.add_files('layer7_login_button.css', 'client');
  api.addFiles('sanjay:accounts-layer7.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('sanjay:accounts-layer7');
  api.addFiles('sanjay:accounts-layer7-tests.js');
});
