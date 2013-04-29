# git-init-index

Given a commit object, a find function and a function to add index entries, populate a git index
with the contents of that commit.


```javascript

var load = require('git-fs-repo')
  , index = require('./index.js')
  , memIndex = require('./mem-index.js')

load('../testsite/.git', function(err, git) {
  var head = git.ref('HEAD').hash
  git.find(head, gothead)

  function gothead(err, commit) {
    console.log("head commit:"+commit.message());
    index(commit, git.find.bind(git), memIndex.add)
  }
})
```

## API

#### index(commit, find, write)

populate a index with the contents of a commit

## License

MIT
