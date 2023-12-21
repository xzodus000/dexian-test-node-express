const express = require("express");
const developRouter = express.Router();
const multer = require("multer");

const checkAuthorizationHeader = (req, res, next) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader || authorizationHeader !== "DEVCREW-BACKEND-TEST") {
    return res.status(401).send("Unauthorized");
  }

  next();
};

const upload = multer({ storage: multer.memoryStorage() });

developRouter.use(checkAuthorizationHeader);

developRouter.get("/", (req, res) => {
  res.send("Welcome to the develop section!");
});

const validateJsonPayload = (req, res, next) => {
  const { a, b } = req.body;

  // Check if 'a' and 'b' properties are present in the JSON payload
  if (!a || !b) {
    return res.status(422).json({
      error: `Unsupported data format`,
    });
  }

  // If the payload is valid, proceed to the next middleware/route handler
  next();
};

developRouter.post("/multiply", validateJsonPayload, (req, res) => {
  const { a, b } = req.body;
  const result = Number(`${a}`) * Number(`${b}`);
  res.status(200); // 201 Created
  res.json({ result });
});

developRouter.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(422).json({ error: "No file uploaded" });
  }

  const fileBuffer = req.file.buffer;
  const myFile = req.file;

  const fileBase64 = fileBuffer.toString("base64");
  const sizeInMB = (myFile.size / (1024 * 1024)).toFixed(2);
  const resBody = {
    fileName: myFile.originalname,
    size: `${sizeInMB}MB`,
    extension: /[.]/.exec(myFile.originalname)
      ? /[^.]+$/.exec(myFile.originalname)[0]
      : undefined,
  };

  res.json(resBody);
});

module.exports = developRouter;
