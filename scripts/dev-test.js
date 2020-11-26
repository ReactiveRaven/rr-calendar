const http = require('http');
const serverPromise = require('./start-basics.js');

serverPromise
  .then((devServer) => {
    const PORT = parseInt(process.env.PORT, 10) || 3000;
    http.get('http://localhost:' + PORT, (resp) => {
      if (resp.statusCode !== 200) {
        console.log();
        console.log('Response code was ' + resp.statusCode);
        devServer.close();
        process.exit(1);
      } else {
        resp.on('data', () => { /* don't care */ });
        resp.on('end', () => {
          console.log();
          console.log("Received response OK");
          devServer.close();
          process.exit(0);
        });
      }
    })
      .on('error', (err) => {
        console.log("Error: " + err.message);
        devServer.close();
        process.exit(1);
      });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
