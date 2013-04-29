/*jshint laxcomma:true, asi:true */

var load = require('git-fs-repo')
  , index = require('./index.js')

load('.git', function(err, git) {
  var head = git.ref('HEAD').hash
  git.find(head, gothead)

  function gothead(err, commit) {
    console.log("head commit:"+commit.message());
    index(commit, git.find.bind(git), function(d) {
        console.log("add to index:", d)
    })
  }
})