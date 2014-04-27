[![Build Status](https://travis-ci.org/JeremyWei/easy_mongo.svg?branch=master)](https://travis-ci.org/JeremyWei/easy_mongo)

easy mongo
===========

Feature
===========
* Persistent connection
* Light & Easy
* Based on native mongodb driver

Install
===========

	npm install easy_mongo

Test
===========

You should have mongodb instance started on 127.0.0.1:27017 without auth.

	make test
	
How to use
===========

	var easyMongo = require('easy_mongo'),
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


LICENSE
===========
The MIT License (MIT)
Copyright (c) 2014 Jeremy Wei

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

