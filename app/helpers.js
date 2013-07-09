var exec = require('child_process').exec;

exports.getLatestWordpress = function(){
  var wp = undefined;
  wp = exec('curl http://wordpress.org/latest.tar.gz | tar --strip-components=1 -xz', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }

    console.log("Latest Wordpress initialized.");

  });

  return wp;
};

exports.gitInit = function(){
  var git = undefined;
  git = exec('git init', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Error code: '+error.code);
      console.log('Signal received: '+error.signal);
    }

    console.log("Git repo initialized.");

  });

  return git;
};
