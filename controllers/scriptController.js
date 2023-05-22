const { exec } = require('child_process');

async function runScript(req, res) {
    exec('bash /var/www/scripts/main_runner.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          res.status(500).json({error: 'An error occurred while executing the script.'});
          return;
        }
        if (stderr) {
          console.error(`Script error: ${stderr}`);
          res.status(500).json({error: 'An error occurred in the script.'});
          return;
        }
        console.log(`Script output: ${stdout}`);
        res.status(200).json({message: 'Exécution du terminée. Retrouvez le sur http://79.137.87.52/final_output.xlsx'});
      });
}

async function runMain(req, res) {
  exec('bash /var/www/scripts/runcompetitor_script.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({error: 'An error occurred while executing the script.'});
      return;
    }
    if (stderr) {
      console.error(`Script error: ${stderr}`);
      res.status(500).json({error: 'An error occurred in the script.'});
      return;
    }
    console.log(`Script output: ${stdout}`);
    res.status(200).json({message: 'Exécution du terminée. Retrouvez le sur http://79.137.87.52/final_output.xlsx'});
  });
}

module.exports = {
    runScript,
    runMain
};