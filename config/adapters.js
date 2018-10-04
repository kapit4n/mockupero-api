module.exports.adapters = {
  'default': 'mongo',
 
  mongo: {
    module: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    user: 'accountUser',
    password: 'password',
    database: 'mockupero'
  }
};