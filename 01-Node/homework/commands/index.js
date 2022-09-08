const fs = require('fs');
const request = require('request');

const commands = {

  pwd: (param, done) => {
    done(process.cwd());
  },

  ls: (param, done) => {
    fs.readdir('.', (err, files) => {
      if (err) throw err;
      done(files.join('\n'));
    });
  },

  date: (param, done) => {
    done(Date());
  },

  echo: (param, done) => {
    done(param);
  },

  curl: (param, done) => {
    request(param, (err, data) => {
      if (err) throw err;
      done(data.body);
    });
  },

  cat: (param, done) => {
    const first = param.split(' ')[0];
    fs.readFile(first, 'utf8', (err, file) => {
      if (err) throw err;
      done(file);
    });
  },

  head: (param, done) => {
    const first = param.split(' ')[0];
    fs.readFile(first, 'utf8', (err, file) => {
      if (err) throw err;
      let line = file.split('\n').splice(0,10).join('\n');
      done(line);
    });
  },

  tail: (param, done) => {
    const first = param.split(' ')[0];
    fs.readFile(first, 'utf8', (err, file) => {
      if (err) throw err;

      let line = file.split('\n').splice(-10).join('\n');
      done(line);
    });
  }

}

module.exports = commands;