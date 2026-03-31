const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");

const upload = multer();

router.post("/predict", upload.single("file"), async (req, res) => {
  try {
    const form = new FormData();
    form.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      "http://127.0.0.1:3000/predict",
      form,
      {
        headers: form.getHeaders(),
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "AI prediction failed" });
  }
});

module.exports = router;