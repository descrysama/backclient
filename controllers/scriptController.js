const { exec } = require('child_process');

async function runScript(req, res) {
    exec('bash your_script.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          res.status(500).send('An error occurred while executing the script.');
          return;
        }
        if (stderr) {
          console.error(`Script error: ${stderr}`);
          res.status(500).send('An error occurred in the script.');
          return;
        }
        console.log(`Script output: ${stdout}`);
        res.send('Script execution completed successfully.');
      });
}

module.exports = {
    runScript
};