import { exec } from "child_process";

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

export default async function (req, res) {
  if (req.method === "POST") {
    const command = req.body;
    try {
      const result = await runCommand(command);
      res.status(200).end(result);
    } catch (err) {
      console.log(err.message);
      res.status(400).end(err.message);
    }
  }
}
