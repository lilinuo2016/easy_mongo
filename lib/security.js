/**
 * Copyright(c) 2014 JeremyWei <shuimuqingshu@gmail.com>
 *
 * Security tool
 *
 * MIT License 
 */
var crypto = require('crypto');

/**
 * MD5 Hash
 *
 * @param {String} str 
 * @api public
 */
var md5 = module.exports.md5 = function (str) {	
  return crypto.createHash('md5').update(str).digest('hex');
}