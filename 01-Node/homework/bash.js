const commands = require('./commands');

const done = (output) => {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
};

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {

  const cmd = data.toString().trim().split(' ')[0];
  const param = data.toString().substring(data.toString().indexOf(' ') + 1).trim();

  if(commands[cmd]){
    commands[cmd](param, done);
  }
  
  else{
    done('El comando no es válido');
  }

});
