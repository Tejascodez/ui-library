import express from "express";
import {
  createComponent,
  getAllComponents,
  getComponentById,
  updateComponent,
  deleteComponent,
} from "../controllers/componentController.js";

import multer from "multer";
import path from "path";

const router = express.Router();

// Setup multer for video upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // video.mp4
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("video"), createComponent);
router.get("/", getAllComponents);
router.get("/:id", getComponentById);
router.put("/:id", upload.single("video"), updateComponent);
router.delete("/:id", deleteComponent);

export default router;
        