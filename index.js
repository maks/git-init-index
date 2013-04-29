/*jshint laxcomma:true, asi:true */

module.exports = index;

var walk = require('git-walk-tree')

/**
 * add - callback function to store entries in the index, it will be called for each entry to 
 *         be written into the git index. It receives a single argument a object with properties:
 *           path{String}, hash{Buffer}, type {Number}, mode, lastmod {Date}
 *  
 */
function index(commit, find, add) {
    var now = new Date()
    walk(find, commit)
      .on('data', function(data) {
          var idxEntry = {
              path : '',
              hash : data.hash,
              type : data.type,
              mode: 0,
              lastmod : now 
          }
          idxEntry.path += data.stack.map(function(s) { return s.name}).join("/")
          idxEntry.mode = (data.stack.length > 0) ? data.stack[data.stack.length-1].mode : 0;
          add(idxEntry)
      })
}
