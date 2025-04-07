import "dotenv/config";
import express from "express";
import api from "./api.js";

const PORT = process.env.PORT || 3000;

api.use("/profile", express.static("dist"));
api.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
