/**
 * Copyright(c) 2014 JeremyWei <shuimuqingshu@gmail.com>
 *
 * Easy mongo tests
 * 
 * MIT License
 */
var should = require('should'),
  easyMongo = require('../.'),
  easyClient = easyMongo.create(),
  assert = require('assert'),
  crypto = require('crypto');

var collection1 = 'test_collection_' + crypto.randomBytes(8).toString('hex'),
  collection2 = 'test_collection_' + crypto.randomBytes(8).toString('hex'),
  dbName = 'easy_mongo_test_' + crypto.randomBytes(8).toString('hex');

describe('EasyMongo', function(){
  before(function(done){
    done();
  });
  
  describe('#collection', function(){
    it('should insert a docment into collection success', function(done){
      easyClient.collection(collection1, function (err, collection) {
        collection.insert({a:1}, {w:1}, function(err, result) {
          assert.equal(null, err);
          done();
        });
      });
    });
  });
  
  describe('#db', function(){
    it('should create collection and insert a docment into collection success', function(done){
      easyClient.database(dbName, function (err, db) {
        db.createCollection(collection2, function (err, collection) {
          assert.equal(null, err);
          done();
        });
      });
    });  
  });
});