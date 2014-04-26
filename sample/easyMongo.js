/**
 * Copyright(c) 2014 JeremyWei <shuimuqingshu@gmail.com>
 *
 * Easy mongo sample
 * 
 * MIT License
 */
var easyMongo = require('../.'),
  easyClient = easyMongo.create();
  
easyClient.collection('user', function (err, collection) {
  // do something with collection user
  var user = {'name' : 'foo'};
  collection.insert(user, {w:1}, function(err, result) {
    // ...
  });
});


// DB
easyClient.database('test', function (err, db) {
  // do something with db test
  db.createCollection('friend', function (err, collection) {
    // ...
  });
});