const ghpages = require('gh-pages');
ghpages.publish(
  './dist/artist-app',
  {
    repo: 'https://' + process.env.GH_TOKEN + '@github.com/inkbucket/artist.git',
    add: true
  },
  function(err) {
    if (err) {
      console.log('Error occured during gh pages push', err);
    } else {
      console.log('Pushed to ghpages!');
    }
  }
);
