const express = require("express");
const developRouter = express.Router();
const multer = require("multer");
// Middleware to check Authorization header
const checkAuthorizationHeader = (req, res, next) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader || authorizationHeader !== "DEVCREW-BACKEND-TEST") {
    return res.status(401).send("Unauthorized");
  }

  // If the header is correct, proceed to the next middleware/route handler
  next();
};

const upload = multer({ storage: multer.memoryStorage() });

// Apply the checkAuthorizationHeader middleware to all routes in the "develop" router
developRouter.use(checkAuthorizationHeader);

// Define a route within the "develop" router
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

// Apply the validateJsonPayload middleware to the specific route
developRouter.post("/multiply", validateJsonPayload, (req, res) => {
  const { a, b } = req.body;
  const result = Number(`${a}`) * Number(`${b}`);
  res.status(200); // 201 Created
  res.json({ result });
});

developRouter.post("/upload", upload.single("file"), (req, res) => {
  // Access the uploaded file information using req.file
  if (!req.file) {
    return res.status(422).json({ error: "No file uploaded" });
  }

  // Access the file data as a buffer (in-memory)
  const fileBuffer = req.file.buffer;
  const myFile = req.file;
  // Process the file data as needed
  // For example, you can convert the buffer to base64
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

// Export the router to use in the main application
module.exports = developRouter;
