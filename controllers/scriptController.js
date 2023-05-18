const { exec } = require('child_process');

async function runScript(req, res) {
    return new Promise((resolve, reject) => {
        exec('bash your_script.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Script error: ${stderr}`);
                reject(new Error(stderr));
                return;
            }
            console.log(`Script output: ${stdout}`);
            resolve();
        });
    });
}

module.exports = {
    runScript
};