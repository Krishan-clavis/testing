const express = require("express");
const crypto = require("crypto");
const { exec } = require("child_process");

const app = express();

const PORT = 3005;
const SECRET = "your_webhook_secret";

// GitHub raw body required
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];

  if (!signature) return false;

  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(req.rawBody);

  const digest = "sha256=" + hmac.digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

app.post("/webhook", (req, res) => {
  if (!verifySignature(req)) {
    return res.status(401).send("Invalid Signature");
  }

  console.log("Webhook Received");

  const branch = req.body.ref;

  if (branch !== "refs/heads/main") {
    return res.send("Ignoring branch");
  }

  const command = `
      cd /home/ec2-user/testing &&
      git reset --hard &&
      git pull origin main &&
      docker compose down &&
      docker compose build --no-cache &&
      docker compose up -d
  `;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log(stdout);

    if (stderr) {
      console.log(stderr);
    }
  });

  res.send("Deployment Started");
});

app.listen(PORT, () => {
  console.log(`Webhook running on port ${PORT}`);
});
