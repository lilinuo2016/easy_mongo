/**
 * Copyright(c) 2014 JeremyWei <shuimuqingshu@gmail.com>
 *
 * EasyMongo
 *
 * MIT License 
 */
var MongoClient = require('mongodb').MongoClient,
  security = require('./security'),
  defaultHost = '127.0.0.1',
  defaultPort = 27017,
  defaultDb = 'easyMongo',
  defaultUser = '',
  defaultPassword = '',
  defaultOptions = {},
  pool = {};

function EasyMongo(host, port, db, user, password, options) {
  this.host = host || defaultHost;
  this.port = port || defaultPort;
  this.db = db || defaultDb;
  this.user = user || defaultUser;
  this.password = password || defaultPassword;
  this.options = options || defaultOptions;
}

module.exports.create = function (host, port, db, user, password, options) {
  return new EasyMongo(host, port, db, user, password, options);
}

/**
 * Connect to db
 *
 * @param {Function} cb
 * @api public
 */
function connect (host, port, db, user, password, options, cb) {
  
  var fingerPrint = security.md5(host + port + db);
  
	if (pool[fingerPrint] && pool[fingerPrint].state == 'connected') {
    cb(null, pool[fingerPrint]);
		return ;
	}
  
	var connectStr = 'mongodb://' + host + ':' + port + '/' + db + '?';
  
	MongoClient.connect(connectStr, options, function(err, db) {
    if (err) {
			cb(err, null);
			return ;
		}
    
    // Need auth
    if (user && password) {
      db.authenticate(user, password, function(err, result) {
    		if (err) {
    			cb(err, null);
    			return ;
    		}
      
        if (result === true) {
          pool[fingerPrint] = db;
          cb(null, db);
        } else {
          cb(new Error('auth fail'), null);
        }
    	});
    } else {
      pool[fingerPrint] = db;
      cb(null, db);
    }
	});
}

/**
 * Collection operation
 *
 * @param {String} name
 * @param {Function} cb
 * @api public
 */
EasyMongo.prototype.collection = function(name, cb) {
  connect(this.host, this.port, this.db, this.user, this.password, this.options, function (err, db) {
    if (err) {
      cb(err, null);
    }
    
		db.collection(name, function(err, collection) {
			cb(err, collection);
		});
  });
};

/**
 * DB operation
 *
 * @param {String} name
 * @param {Function} cb
 * @api public
 */
EasyMongo.prototype.database = function(name, cb) {
  connect(this.host, this.port, this.db, this.user, this.password, this.options, function (err, db) {
    if (err) {
      cb(err, null);
    }
    
    cb(null, db);
  });
}
  
/**
 * Get autoincrement collection id
 *
 * @param {String} collectionId
 * @param {Function} cb
 * @api public
 */
EasyMongo.prototype.getAutoId = function(collectionId, cb) {  
	this.collection('counters', function(err, collection) {
		if (err) {
			cb(err, null);
		} else {
			collection.findAndModify({_id : collectionId}, [['_id', 1]], 
				{$inc : {seq:1}}, {new : true}, 
				function(err, doc) {
					cb(err, doc);
				});
		}
	});
}